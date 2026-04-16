document.getElementById("getImages").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const images = document.querySelectorAll("img");
            return [...images].map(img => img.src);
        }
    }, (results) => {

        const container = document.getElementById("images");
        container.innerHTML = "";
        //images count
        const images = results[0].result;
        const count = images.length;
        document.getElementById("imageCount").textContent = count;


        // show/hide empty state
        if (count === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }

         results[0].result.filter(src => {
            return src && src.startsWith("http");
        });
        results[0].result.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.width = 100;
            //remove broken images
            img.onerror = () => {
                img.remove();
            };

            container.appendChild(img);
        });

    });

});