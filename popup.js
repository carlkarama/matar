const pickColorBtn = document.getElementById("pickColor");
const historyContainer = document.getElementById("colorHistory");

const eyeDropper = new EyeDropper();

pickColorBtn.addEventListener("click", async () => {
  try {
    const result = await eyeDropper.open();
    saveColor(result.sRGBHex);
    displayHistory();
  } catch (err) {
    console.error("Error picking color:", err);
  }
});

function saveColor(hex) {
  let history = JSON.parse(localStorage.getItem("colorHistory") || "[]");
  history.unshift(hex);
  if (history.length > 10) history.pop();
  localStorage.setItem("colorHistory", JSON.stringify(history));
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("colorHistory") || "[]");
    historyContainer.innerHTML = "";

    history.forEach(hex => {
        const swatchWrapper = document.createElement("div");
        swatchWrapper.className = "swatch-wrapper";

        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = hex;
        swatch.title = hex;

        const label = document.createElement("span");
        label.className = "swatch-label";
        label.textContent = hex;

        swatchWrapper.addEventListener("click", () => {
            navigator.clipboard.writeText(hex).then(() => {

                swatchWrapper.classList.add("copied");

                const copiedTooltip = document.createElement("div");
                copiedTooltip.className = "copied-tooltip";
                copiedTooltip.textContent = "Copied!";
                swatchWrapper.appendChild(copiedTooltip);

                setTimeout(() => {
                    swatchWrapper.classList.remove("copied");
                    copiedTooltip.remove();
                }, 1000);
            });
        });

        swatchWrapper.appendChild(swatch);
        swatchWrapper.appendChild(label);
        historyContainer.appendChild(swatchWrapper);
    });
}  

document.addEventListener("DOMContentLoaded", displayHistory);
