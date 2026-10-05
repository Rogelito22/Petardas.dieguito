// Lista de blinkies iniciales
const initialBlinkies = [
  { id: 1, text: "Strong & Proud", bgClass: "bg-1", tag: "pride" },
  { id: 2, text: "LOVEFOOL", bgClass: "bg-2", tag: "love" },
  { id: 3, text: "ADHD!", bgClass: "bg-3", tag: "gaming" },
  { id: 4, text: "demigender", bgClass: "bg-4", tag: "pride" },
  { id: 5, text: "wolfgender", bgClass: "bg-5", tag: "pride" },
  { id: 6, text: "werewolfgender", bgClass: "bg-1", tag: "pride" },
  { id: 7, text: "doggender pride", bgClass: "bg-2", tag: "pride" },
  { id: 8, text: "Hypnotizedddd", bgClass: "bg-3", tag: "gaming" },
  { id: 9, text: "i love you guys", bgClass: "bg-4", tag: "love" },
  { id: 10, text: "love letter", bgClass: "bg-5", tag: "love" },
  { id: 11, text: "Secret Soulmates", bgClass: "bg-1", tag: "love" },
  { id: 12, text: "I pika-choose you!", bgClass: "bg-2", tag: "gaming" }
];

let isFrozen = false;

// Nodos DOM
const blinkiesGrid = document.getElementById("blinkiesGrid");
const freezeCheck = document.getElementById("freezeCheck");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const tagSelect = document.getElementById("tagSelect");

// Nodos Editor Modal
const editorModal = document.getElementById("editorModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const customTextInput = document.getElementById("customTextInput");
const textColorInput = document.getElementById("textColorInput");
const speedInput = document.getElementById("speedInput");
const modalBlinkiePreview = document.getElementById("modalBlinkiePreview");
const modalTextPreview = document.getElementById("modalTextPreview");
const saveBtn = document.getElementById("saveBtn");

// Renderizar la lista
function renderBlinkies(list) {
  blinkiesGrid.innerHTML = "";
  if (list.length === 0) {
    blinkiesGrid.innerHTML = "<p style='font-size:11px;'>No blinkies found!</p>";
    return;
  }

  list.forEach((item) => {
    const el = document.createElement("div");
    el.className = `blinkie ${item.bgClass} ${isFrozen ? "frozen" : ""}`;
    el.textContent = item.text;
    
    el.addEventListener("click", () => openEditor(item));
    blinkiesGrid.appendChild(el);
  });
}

// Congelar / Descongelar
freezeCheck.addEventListener("change", (e) => {
  isFrozen = e.target.checked;
  const elements = document.querySelectorAll(".blinkie");
  elements.forEach((el) => {
    if (isFrozen) {
      el.classList.add("frozen");
    } else {
      el.classList.remove("frozen");
    }
  });
});

// Filtrar
function filterBlinkies() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedTag = tagSelect.value;

  const filtered = initialBlinkies.filter((item) => {
    const matchesText = item.text.toLowerCase().includes(query);
    const matchesTag = selectedTag === "all" || item.tag === selectedTag;
    return matchesText && matchesTag;
  });

  renderBlinkies(filtered);
}

searchBtn.addEventListener("click", filterBlinkies);
tagSelect.addEventListener("change", filterBlinkies);

// Abrir Editor Modal
function openEditor(item) {
  customTextInput.value = item.text;
  modalTextPreview.textContent = item.text;
  modalBlinkiePreview.className = `blinkie-preview ${item.bgClass}`;
  editorModal.classList.add("active");
}

closeModalBtn.addEventListener("click", () => {
  editorModal.classList.remove("active");
});

// Actualizaciones dinámicas
customTextInput.addEventListener("input", (e) => {
  modalTextPreview.textContent = e.target.value || "TEXT";
});

textColorInput.addEventListener("input", (e) => {
  modalTextPreview.style.color = e.target.value;
});

speedInput.addEventListener("change", (e) => {
  modalBlinkiePreview.style.animationDuration = e.target.value;
});

saveBtn.addEventListener("click", () => {
  alert("Blinkie customized!");
  editorModal.classList.remove("active");
});

// Inicializar
renderBlinkies(initialBlinkies);