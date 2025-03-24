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
    const swatch = document.createElement("div");
    swatch.style.backgroundColor = hex;
    swatch.className = "swatch";
    swatch.title = hex;
    historyContainer.appendChild(swatch);
  });
}

document.addEventListener("DOMContentLoaded", displayHistory);
