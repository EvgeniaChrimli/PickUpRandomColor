const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault(); // чтоб замочек при обновлении не менялся ы
  if (event.code.toLocaleLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLocaleLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyColorToClick(event.target.textContent);
  }
});

//копирование кода цвета при нажатии
function copyColorToClick(text) {
  return navigator.clipboard.writeText(text);
}

function generationRandomColor() {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return "#" + color;
}
function setRandomColors() {
  colors = [];
  cols.forEach((col) => {
    //чтобы заблокированный Цвет  не менялся при обновлении
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = chroma.random();

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    colors.push(color);

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

//ф-ция для опред оттенка
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors();
