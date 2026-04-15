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

    results[0].result.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.width = 100;
      container.appendChild(img);
    });

  });

});