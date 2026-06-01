// --- CodeMirror Initialization ---
let editor;

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('code');
    editor = CodeMirror.fromTextArea(textarea, {
        mode: 'python',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        lineWrapping: true,
        fontSize: '16px'
    });

    const toggleBtn = document.getElementById("themeToggle");
    const body = document.body;

    const moonIcon = toggleBtn.querySelector(".icon-moon");
    const sunIcon  = toggleBtn.querySelector(".icon-sun");

    function setTheme(mode) {
        if (mode === "dark") {
            body.classList.add("dark");
            if (moonIcon) moonIcon.style.display = "none";
            if (sunIcon)  sunIcon.style.display  = "";
            if (editor) editor.setOption("theme", "material-darker");
        } else {
            body.classList.remove("dark");
            if (moonIcon) moonIcon.style.display = "";
            if (sunIcon)  sunIcon.style.display  = "none";
            if (editor) editor.setOption("theme", "default");
        }
        localStorage.setItem("theme", mode);
    }

    toggleBtn.addEventListener("click", () => {
        const isDark = body.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
    });

    // Default to dark for a professional IDE feel
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    window.editor = editor;

    // Ctrl+Enter to run
    editor.addKeyMap({ "Ctrl-Enter": () => { if (window.externalRunCode) window.externalRunCode(); } });

    // Track cursor position in status bar
    const lineInfo = document.getElementById("lineInfo");
    editor.on("cursorActivity", () => {
        const cur = editor.getCursor();
        if (lineInfo) lineInfo.textContent = `Ln ${cur.line + 1}, Col ${cur.ch + 1}`;
    });
});

// --- Main Tab Controls ---
document.querySelectorAll('.main-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        if (targetTab === 'editor' && window.editor) setTimeout(() => window.editor.refresh(), 100);
    });
});

// --- Docs Tabs ---
document.querySelectorAll('.docs-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.docsTab;
        document.querySelectorAll('.docs-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.docs-panel').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// --- Virtual Keyboard ---
const keyboardToggle = document.getElementById("keyboardToggle");
const virtualKeyboard = document.getElementById("virtualKeyboard");
const keyboardOverlay = document.getElementById("keyboardOverlay");
const keyboardClose = document.getElementById("keyboardClose");

function toggleKeyboard() {
    const isActive = virtualKeyboard.classList.contains("active");
    if (isActive) {
        virtualKeyboard.classList.remove("active");
        keyboardOverlay.classList.remove("active");
        keyboardToggle.innerHTML = "⌨️ हिंदी";
    } else {
        virtualKeyboard.classList.add("active");
        keyboardOverlay.classList.add("active");
        keyboardToggle.innerHTML = "⌨️ बंद करें";
    }
}

keyboardToggle.addEventListener("click", toggleKeyboard);
keyboardClose.addEventListener("click", toggleKeyboard);
keyboardOverlay.addEventListener("click", toggleKeyboard);

document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        const keyValue = key.dataset.key;
        const doc = editor.getDoc();
        const cursor = doc.getCursor();

        if (keyValue === "backspace") doc.replaceRange("", { line: cursor.line, ch: cursor.ch - 1 }, cursor);
        else if (keyValue === "enter") doc.replaceRange("\n", cursor);
        else if (keyValue === "space") doc.replaceRange(" ", cursor);
        else doc.replaceRange(keyValue, cursor);

        editor.focus();
        key.style.transform = "scale(0.95)";
        setTimeout(() => (key.style.transform = ""), 150);
    });
});

// --- Voice Typing ---
let recognizing = false;
let recognition;
document.getElementById('voiceBtn').addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('वॉइस टाइपिंग ब्राउज़र में समर्थित नहीं है');
        return;
    }
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN';
        recognition.onresult = e => {
            let transcript = e.results[0][0].transcript.trim();
            insertVoiceCode(transcript);
        };
        recognition.onend = () => {
            recognizing = false;
            document.getElementById('voiceBtn').textContent = '🎤 वॉइस टाइपिंग';
        };
    }
    if (!recognizing) {
        recognition.start();
        recognizing = true;
        document.getElementById('voiceBtn').textContent = '🔴 रिकॉर्डिंग…';
    } else {
        recognition.stop();
        recognizing = false;
        document.getElementById('voiceBtn').textContent = '🎤 वॉइस टाइपिंग';
    }
});

function insertVoiceCode(text) {
    text = text.replace(/[\p{P}\p{S}]/gu, '');
    const words = text.trim().split(/\s+/);
    let line = "";
    words.forEach(w => (line += w + " "));
    const cm = editor;
    const cursor = cm.getCursor();
    cm.replaceRange(line, cursor);
    cm.focus();
}

// --- Load Example Programs ---
function loadExample() {
    const examples = [
        `छापें('नमस्ते सरजी!')
नाम = 'यश'
उम्र = २५
छापें('मेरा नाम', नाम, 'है और मैं', उम्र, 'साल का हूं')`,
        `क = १०
ख = २०
योग = क + ख
छापें('योग:', योग)
अगर योग > २५:
    छापें('योग २५ से अधिक है')
अन्यथा:
    छापें('योग २५ से कम है')`,
        `के_लिए संख्या में सीमा(१, ६):
    छापें('संख्या:', संख्या)
गिनती = ०
जबतक गिनती < ३:
    छापें('गिनती:', गिनती)
    गिनती = गिनती + १`
    ];
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    editor.setValue(randomExample);
}

function clearCode() {
    editor.setValue('');
    document.getElementById('output').textContent = 'यहां आपके कोड का परिणाम दिखेगा...';
    document.getElementById('explanation').textContent = 'यहां आपके कोड की व्याख्या होगी...';
}

// --- Button Bindings ---
window.addEventListener("DOMContentLoaded", () => {
    const runButton = document.getElementById("runButton");
    runButton.addEventListener("click", () => {
        if (window.externalRunCode) window.externalRunCode();
    });

    const exampleBtn = document.getElementById("exampleBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (exampleBtn) exampleBtn.addEventListener("click", loadExample);
    if (clearBtn) clearBtn.addEventListener("click", clearCode);
});

// --- Load specific example from docs tab into editor ---
function loadSpecificExample(num) {
    const examples = {
        1: `क = १०\nख = २०\nयोग = क + ख\nछापें("योग है:", योग)`,
        2: `अंक = ८५\n\nअगर अंक >= ९०:\n    छापें("ग्रेड: A+")\nअगर_अन्यथा अंक >= ८०:\n    छापें("ग्रेड: A")\nअन्यथा:\n    छापें("ग्रेड: C")`,
        3: `संख्या = ५\nके_लिए i में सीमा(१, ११):\n    परिणाम = संख्या * i\n    छापें(संख्या, "×", i, "=", परिणाम)`,
        4: `वर्ग विद्यार्थी(वस्तु):\n    परिभाषित आरंभ(स्वं, नाम, उम्र):\n        स्वं.नाम = नाम\n        स्वं.उम्र = उम्र\n\n    परिभाषित विवरण_दिखाएँ(स्वं):\n        छापें("👤 नाम:", स्वं.नाम)\n        छापें("🎂 उम्र:", स्वं.उम्र)\n\nविद्यार्थी1 = विद्यार्थी("राहुल", २०)\nविद्यार्थी1.विवरण_दिखाएँ()`
    };
    if (!editor || !examples[num]) return;
    editor.setValue(examples[num]);
    // Switch to editor tab
    document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="editor"]').classList.add('active');
    document.getElementById('editor').classList.add('active');
    setTimeout(() => { editor.refresh(); editor.focus(); }, 100);
}
window.loadSpecificExample = loadSpecificExample;
