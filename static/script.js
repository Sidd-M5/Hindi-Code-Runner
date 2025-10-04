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
  
  try {
    // Get the code using the helper function set by HTML
    const code = window.getCodeValue ? window.getCodeValue() : 
                 (window.editor ? window.editor.getValue() : 
                  document.getElementById("code").value);

    // ✅ Fix Hindi numbers before sending
    const normalizedCode = normalizeHindiNumbers(code);

    outputElement.textContent = "⌛ कोड चल रहा है...";
    explanationElement.textContent = "⌛ व्याख्या तैयार हो रही है...";

    const response = await fetch("/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hindi_code: normalizedCode }),
    });

    const result = await response.json();

    // ✅ Check if there's an error using the is_error flag
    if (result.is_error) {
      // Display the Hindi-translated error
      outputElement.textContent = "❌ " + result.output;
      outputElement.style.color = "#ff4444";  // Red color for errors
      explanationElement.textContent = result.explanation;
      
      // Optional: Log the English error to console for debugging
      if (result.error) {
        console.error("Original error:", result.error);
      }
    } else {
      // Display successful output
      outputElement.textContent = result.output || "✅ कोड सफलतापूर्वक चला, लेकिन कोई आउटपुट नहीं मिला";
      outputElement.style.color = "#00ff00";  // Green color for success
      explanationElement.textContent = result.explanation || "ℹ️ कोड की कोई व्याख्या नहीं मिली।";
    }

  } catch (fetchError) {
    // Handle network or server errors
    outputElement.textContent = "❌ सर्वर से कनेक्ट नहीं हो सका: " + fetchError.message;
    outputElement.style.color = "#ff4444";
    explanationElement.textContent = "⚠️ कृपया बाद में पुनः प्रयास करें।";
    console.error("Fetch error:", fetchError);
  } finally {
    // Always reset the button state
    runButton.classList.remove("loading");
    runButton.innerHTML = "▶️ कोड चलाएँ";
  }
};