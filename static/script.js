// 🔹 Convert Hindi digits to English digits
function normalizeHindiNumbers(code) {
  const hindiToEnglish = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  return code.replace(/[०-९]/g, d => hindiToEnglish[d] || d);
}

// Expose your function globally so the HTML can call it
window.externalRunCode = async function() {
  const runButton = document.getElementById("runButton");
  const outputElement = document.getElementById("output");
  const explanationElement = document.getElementById("explanation");
  const statusDot  = document.getElementById("runStatus")?.querySelector(".status-dot");
  const statusText = document.getElementById("runStatus")?.querySelector(".status-text");

  function setStatus(state, label) {
    if (statusDot)  { statusDot.className  = "status-dot " + state; }
    if (statusText) { statusText.textContent = label; }
  }

  try {
    const code = window.getCodeValue ? window.getCodeValue()
               : window.editor ? window.editor.getValue()
               : document.getElementById("code").value;

    const normalizedCode = normalizeHindiNumbers(code);

    runButton.classList.add("loading");
    runButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> चल रहा है...`;
    outputElement.style.color = "";
    outputElement.textContent = "⏳  कोड चल रहा है...";
    explanationElement.textContent = "⏳  व्याख्या तैयार हो रही है...";
    setStatus("running", "चल रहा है...");

    const response = await fetch("/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hindi_code: normalizedCode }),
    });

    const result = await response.json();

    if (result.is_error) {
      outputElement.textContent = "❌  " + result.output;
      outputElement.style.color = "#f85149";
      explanationElement.textContent = result.explanation;
      setStatus("error", "त्रुटि");
      if (result.error) console.error("Original error:", result.error);
    } else {
      outputElement.textContent = result.output || "✅  कोड सफलतापूर्वक चला, कोई आउटपुट नहीं मिला।";
      outputElement.style.color = "#3fb950";
      explanationElement.textContent = result.explanation || "ℹ️  कोड की कोई व्याख्या नहीं मिली।";
      setStatus("success", "सफल");
    }

  } catch (fetchError) {
    outputElement.textContent = "❌  सर्वर से कनेक्ट नहीं हो सका: " + fetchError.message;
    outputElement.style.color = "#f85149";
    explanationElement.textContent = "⚠️  कृपया बाद में पुनः प्रयास करें।";
    setStatus("error", "कनेक्शन एरर");
    console.error("Fetch error:", fetchError);
  } finally {
    runButton.classList.remove("loading");
    runButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> कोड चलाएँ <span class="run-shortcut">Ctrl+Enter</span>`;
  }
};