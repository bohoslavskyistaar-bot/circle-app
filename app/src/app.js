const wheelData = [
  { major: "C", minor: "Am", dim: "Bdim" },
  { major: "G", minor: "Em", dim: "F#dim" },
  { major: "D", minor: "Bm", dim: "C#dim" },
  { major: "A", minor: "F#m", dim: "G#dim" },
  { major: "E", minor: "C#m", dim: "D#dim" },
  { major: "B", minor: "G#m", dim: "A#dim" },
  { major: "F#/Gb", minor: "D#m/Ebm", dim: "Fdim" },
  { major: "Db", minor: "Bbm", dim: "Cdim" },
  { major: "Ab", minor: "Fm", dim: "Gdim" },
  { major: "Eb", minor: "Cm", dim: "Ddim" },
  { major: "Bb", minor: "Gm", dim: "Adim" },
  { major: "F", minor: "Dm", dim: "Edim" }
];

const noteToPitch = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11
};

const pitchToSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const pitchToFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const whitePitchClasses = new Set([0, 2, 4, 5, 7, 9, 11]);
const locales = {
  uk: {
    code: "UK",
    lang: "uk",
    appTitle: "Коло акордів",
    circleOfFifths: "Circle of Fifths",
    wheelAria: "Коло квінт з мажорними, мінорними та зменшеними акордами",
    stageAria: "Інтерактивне коло акордів",
    play: "Програти",
    playSelected: "Програти вибраний акорд",
    close: "Закрити",
    changeLanguage: "Змінити мову",
    major: "Мажор",
    minor: "Мінор",
    dim: "Зменшений",
    centerA: "КОЛО",
    centerB: "АКОРДІВ",
    centerC: "I  IV  V",
    keysForChord: (chord) => `Клавіші для акорду ${chord}`
  },
  en: {
    code: "EN",
    lang: "en",
    appTitle: "Chord Circle",
    circleOfFifths: "Circle of Fifths",
    wheelAria: "Circle of fifths with major, minor, and diminished chords",
    stageAria: "Interactive chord circle",
    play: "Play",
    playSelected: "Play selected chord",
    close: "Close",
    changeLanguage: "Change language",
    major: "Major",
    minor: "Minor",
    dim: "Diminished",
    centerA: "CHORD",
    centerB: "CIRCLE",
    centerC: "I  IV  V",
    keysForChord: (chord) => `Keys for ${chord}`
  },
  fr: {
    code: "FR",
    lang: "fr",
    appTitle: "Cercle d'accords",
    circleOfFifths: "Cycle des quintes",
    wheelAria: "Cycle des quintes avec accords majeurs, mineurs et diminués",
    stageAria: "Cercle d'accords interactif",
    play: "Jouer",
    playSelected: "Jouer l'accord sélectionné",
    close: "Fermer",
    changeLanguage: "Changer de langue",
    major: "Majeur",
    minor: "Mineur",
    dim: "Diminué",
    centerA: "CERCLE",
    centerB: "ACCORDS",
    centerC: "I  IV  V",
    keysForChord: (chord) => `Touches pour ${chord}`
  },
  es: {
    code: "ES",
    lang: "es",
    appTitle: "Círculo de acordes",
    circleOfFifths: "Círculo de quintas",
    wheelAria: "Círculo de quintas con acordes mayores, menores y disminuidos",
    stageAria: "Círculo interactivo de acordes",
    play: "Tocar",
    playSelected: "Tocar el acorde seleccionado",
    close: "Cerrar",
    changeLanguage: "Cambiar idioma",
    major: "Mayor",
    minor: "Menor",
    dim: "Disminuido",
    centerA: "CÍRCULO",
    centerB: "ACORDES",
    centerC: "I  IV  V",
    keysForChord: (chord) => `Teclas para ${chord}`
  },
  pt: {
    code: "PT",
    lang: "pt",
    appTitle: "Círculo de acordes",
    circleOfFifths: "Círculo das quintas",
    wheelAria: "Círculo das quintas com acordes maiores, menores e diminutos",
    stageAria: "Círculo interativo de acordes",
    play: "Tocar",
    playSelected: "Tocar acorde selecionado",
    close: "Fechar",
    changeLanguage: "Alterar idioma",
    major: "Maior",
    minor: "Menor",
    dim: "Diminuto",
    centerA: "CÍRCULO",
    centerB: "ACORDES",
    centerC: "I  IV  V",
    keysForChord: (chord) => `Teclas para ${chord}`
  },
  zh: {
    code: "ZH",
    lang: "zh",
    appTitle: "和弦圈",
    circleOfFifths: "五度圈",
    wheelAria: "包含大三和弦、小三和弦与减三和弦的五度圈",
    stageAria: "交互式和弦圈",
    play: "播放",
    playSelected: "播放所选和弦",
    close: "关闭",
    changeLanguage: "更改语言",
    major: "大调",
    minor: "小调",
    dim: "减和弦",
    centerA: "和弦",
    centerB: "圈",
    centerC: "I  IV  V",
    keysForChord: (chord) => `${chord} 的琴键`
  },
  ja: {
    code: "JA",
    lang: "ja",
    appTitle: "コードサークル",
    circleOfFifths: "五度圏",
    wheelAria: "メジャー、マイナー、ディミニッシュのコードを含む五度圏",
    stageAria: "インタラクティブなコードサークル",
    play: "再生",
    playSelected: "選択したコードを再生",
    close: "閉じる",
    changeLanguage: "言語を変更",
    major: "メジャー",
    minor: "マイナー",
    dim: "ディミニッシュ",
    centerA: "コード",
    centerB: "サークル",
    centerC: "I  IV  V",
    keysForChord: (chord) => `${chord} の鍵盤`
  }
};

const state = {
  selected: makeChord("C", "major"),
  audioContext: null,
  locale: localStorage.getItem("chordCircleLocale") || "uk"
};

const wheel = document.querySelector("#chordWheel");
const wheelStage = document.querySelector(".wheel-stage");
const title = document.querySelector("h1");
const eyebrow = document.querySelector(".brand-row .eyebrow");
const selectedFamily = document.querySelector("#selectedFamily");
const selectedChord = document.querySelector("#selectedChord");
const selectedNotes = document.querySelector("#selectedNotes");
const keyboard = document.querySelector("#keyboard");
const playSelected = document.querySelector("#playSelected");
const panelPlay = document.querySelector("#panelPlay");
const panelPlayLabel = panelPlay.querySelector("span:last-child");
const shade = document.querySelector("#shade");
const dialog = document.querySelector("#chordDialog");
const dialogFamily = document.querySelector("#dialogFamily");
const dialogChord = document.querySelector("#dialogChord");
const dialogNotes = document.querySelector("#dialogNotes");
const dialogKeyboard = document.querySelector("#dialogKeyboard");
const dialogPlay = document.querySelector("#dialogPlay");
const dialogPlayLabel = dialogPlay.querySelector("span:last-child");
const dialogCloseSecondary = document.querySelector("#dialogCloseSecondary");
const localeButton = document.querySelector("#localeButton");
const localeCode = document.querySelector("#localeCode");
const localeOptions = document.querySelector("#localeOptions");

initLocaleMenu();
applyLocale();
renderWheel();
selectChord(state.selected, false);

playSelected.addEventListener("click", () => playChord(state.selected));
panelPlay.addEventListener("click", () => playChord(state.selected));
dialogPlay.addEventListener("click", () => playChord(state.selected));
dialogCloseSecondary.addEventListener("click", closeDialog);
dialog.addEventListener("cancel", () => {
  shade.hidden = true;
});

function t(key) {
  return (locales[state.locale] || locales.uk)[key];
}

function initLocaleMenu() {
  localeButton.addEventListener("click", () => {
    const isOpen = !localeOptions.hidden;
    localeOptions.hidden = isOpen;
    localeButton.setAttribute("aria-expanded", String(!isOpen));
  });

  localeOptions.querySelectorAll("[data-locale]").forEach((option) => {
    option.addEventListener("click", () => {
      setLocale(option.dataset.locale);
      localeOptions.hidden = true;
      localeButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!localeButton.contains(event.target) && !localeOptions.contains(event.target)) {
      localeOptions.hidden = true;
      localeButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      localeOptions.hidden = true;
      localeButton.setAttribute("aria-expanded", "false");
    }
  });
}

function setLocale(locale) {
  if (!locales[locale]) return;
  state.locale = locale;
  localStorage.setItem("chordCircleLocale", locale);
  applyLocale();
  renderWheel();
  selectChord(state.selected, false);
}

function applyLocale() {
  const copy = locales[state.locale] || locales.uk;
  document.documentElement.lang = copy.lang;
  document.title = copy.appTitle;
  title.textContent = copy.appTitle;
  eyebrow.textContent = copy.circleOfFifths;
  wheelStage.setAttribute("aria-label", copy.stageAria);
  wheel.setAttribute("aria-label", copy.wheelAria);
  playSelected.setAttribute("aria-label", copy.playSelected);
  playSelected.setAttribute("title", copy.playSelected);
  localeButton.setAttribute("aria-label", copy.changeLanguage);
  localeButton.setAttribute("title", copy.changeLanguage);
  localeCode.textContent = copy.code;
  panelPlayLabel.textContent = copy.play;
  dialogPlayLabel.textContent = copy.play;
  dialogCloseSecondary.textContent = copy.close;
  dialogCloseSecondary.setAttribute("aria-label", copy.close);

  localeOptions.querySelectorAll("[data-locale]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.locale === state.locale);
  });
}

function renderWheel() {
  wheel.replaceChildren();

  const rings = [
    { type: "major", label: t("major"), inner: 345, outer: 475, key: "major" },
    { type: "minor", label: t("minor"), inner: 232, outer: 345, key: "minor" },
    { type: "dim", label: t("dim"), inner: 122, outer: 232, key: "dim" }
  ];

  const background = svgElement("circle", {
    cx: 500,
    cy: 500,
    r: 484,
    fill: "#fffdf8",
    stroke: "#1b1b1d",
    "stroke-width": 6
  });
  wheel.append(background);

  rings.forEach((ring) => {
    wheelData.forEach((slice, index) => {
      const centerAngle = -90 + index * 30;
      const chordName = slice[ring.key];
      const chord = makeChord(chordName, ring.type);
      const path = svgElement("path", {
        class: `sector ${ring.type}`,
        d: sectorPath(500, 500, ring.inner, ring.outer, centerAngle - 15, centerAngle + 15),
        tabindex: "0",
        role: "button",
        "aria-label": `${chordName}, ${ring.label}`
      });

      path.dataset.chord = chord.name;
      path.dataset.type = chord.type;
      path.addEventListener("click", () => {
        selectChord(chord, true);
      });
      path.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectChord(chord, true);
        }
      });
      wheel.append(path);

      const labelPoint = polarToCartesian(500, 500, (ring.inner + ring.outer) / 2, centerAngle);
      const label = svgElement("text", {
        class: `sector-label ${ring.type}${chordName.includes("/") ? " long" : ""}`,
        x: labelPoint.x,
        y: labelPoint.y
      });
      label.textContent = ring.type === "dim" ? `${canonicalRoot(chordName)}°` : chordName;
      wheel.append(label);
    });
  });

  const center = svgElement("circle", {
    class: "wheel-center",
    cx: 500,
    cy: 500,
    r: 119
  });
  const titleA = svgElement("text", {
    class: "wheel-title",
    x: 500,
    y: 472,
    "font-size": 44
  });
  titleA.textContent = t("centerA");
  const titleB = svgElement("text", {
    class: "wheel-title",
    x: 500,
    y: 526,
    "font-size": 44
  });
  titleB.textContent = t("centerB");
  const titleC = svgElement("text", {
    class: "wheel-title",
    x: 500,
    y: 566,
    "font-size": 19
  });
  titleC.textContent = t("centerC");
  wheel.append(center, titleA, titleB, titleC);
}

function selectChord(chord, openPopup) {
  state.selected = chord;
  document.querySelectorAll(".sector").forEach((sector) => {
    sector.classList.toggle("is-selected", sector.dataset.chord === chord.name && sector.dataset.type === chord.type);
  });

  const noteText = chord.notes.map((note) => note.label).join(" - ");
  selectedFamily.textContent = familyLabel(chord.type);
  selectedChord.textContent = chord.name;
  selectedNotes.textContent = noteText;
  keyboard.innerHTML = renderKeyboard(chord);
  keyboard.setAttribute("aria-label", t("keysForChord")(chord.name));

  dialogFamily.textContent = familyLabel(chord.type);
  dialogChord.textContent = chord.name;
  dialogNotes.textContent = noteText;
  dialogKeyboard.innerHTML = renderKeyboard(chord);
  dialogKeyboard.setAttribute("aria-label", t("keysForChord")(chord.name));

  if (openPopup) {
    playChord(chord);
    shade.hidden = false;
    if (!dialog.open) {
      dialog.showModal();
    }
  }
}

function makeChord(name, type) {
  const rootName = canonicalRoot(name);
  const rootPitch = noteToPitch[rootName];
  const intervals = type === "major" ? [0, 4, 7] : type === "minor" ? [0, 3, 7] : [0, 3, 6];
  const rootMidi = 60 + rootPitch;
  const usesFlats = name.includes("b") && !name.includes("#");
  const noteNames = usesFlats ? pitchToFlat : pitchToSharp;

  return {
    name,
    type,
    rootName,
    notes: intervals.map((interval) => {
      const midi = rootMidi + interval;
      const pitch = midi % 12;
      return {
        midi,
        pitch,
        label: `${noteNames[pitch]}${octaveForMidi(midi)}`
      };
    })
  };
}

function canonicalRoot(name) {
  return name.replace("dim", "").replace("m", "").split("/")[0];
}

function familyLabel(type) {
  if (type === "major") return t("major");
  if (type === "minor") return t("minor");
  return t("dim");
}

function renderKeyboard(chord) {
  const active = new Set(chord.notes.map((note) => note.midi));
  const startMidi = 48;
  const endMidi = 83;
  const whiteKeys = [];
  const blackKeys = [];
  let whiteIndex = 0;

  for (let midi = startMidi; midi <= endMidi; midi += 1) {
    const pitch = midi % 12;
    const octave = octaveForMidi(midi);
    if (whitePitchClasses.has(pitch)) {
      whiteKeys.push({ midi, pitch, octave, index: whiteIndex });
      whiteIndex += 1;
    } else {
      blackKeys.push({ midi, pitch, octave, x: whiteIndex * 34 - 11 });
    }
  }

  const width = whiteKeys.length * 34;
  const whiteMarkup = whiteKeys.map((key) => {
    const x = key.index * 34;
    const isActive = active.has(key.midi);
    const label = active.has(key.midi) ? pitchToSharp[key.pitch] : "";
    return `
      <rect class="white-key${isActive ? " key-active" : ""}" x="${x}" y="0" width="34" height="128" rx="0"></rect>
      ${label ? `<text class="key-label" x="${x + 17}" y="114">${label}${key.octave}</text>` : ""}
    `;
  }).join("");

  const blackMarkup = blackKeys.map((key) => {
    const x = key.x;
    const isActive = active.has(key.midi);
    const label = active.has(key.midi) ? pitchToSharp[key.pitch] : "";
    return `
      <rect class="black-key${isActive ? " key-active" : ""}" x="${x}" y="0" width="22" height="78" rx="0"></rect>
      ${label ? `<text class="key-label on-black" x="${x + 11}" y="64">${label}${key.octave}</text>` : ""}
    `;
  }).join("");

  return `
    <svg class="keyboard-svg" viewBox="0 0 ${width} 128" role="img">
      ${whiteMarkup}
      ${blackMarkup}
    </svg>
  `;
}

function playChord(chord) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  if (!state.audioContext) {
    state.audioContext = new AudioContext();
  }

  const context = state.audioContext;
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.28, now + 0.025);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
  master.connect(context.destination);

  chord.notes.forEach((note, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index === 0 ? "triangle" : "sine";
    oscillator.frequency.value = midiToFrequency(note.midi);
    gain.gain.value = index === 0 ? 0.92 : 0.72;
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now + index * 0.018);
    oscillator.stop(now + 1.2);
  });
}

function closeDialog() {
  shade.hidden = true;
  if (dialog.open) {
    dialog.close();
  }
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function octaveForMidi(midi) {
  return Math.floor(midi / 12) - 1;
}

function sectorPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z"
  ].join(" ");
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = angleInDegrees * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians)
  };
}

function svgElement(name, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}
