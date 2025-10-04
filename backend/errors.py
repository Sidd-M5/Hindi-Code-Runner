error_translation = {
    "SyntaxError": "सिंटैक्स त्रुटि: कोड लिखावट में गलती है।",
    "NameError": "नाम त्रुटि: आपने ऐसा नाम उपयोग किया है जो परिभाषित नहीं है।",
    "IndentationError": "इंडेंटेशन त्रुटि: कोड सही तरीके से space/tab से नहीं लिखा गया।",
    "TypeError": "टाइप त्रुटि: गलत प्रकार के डेटा पर ऑपरेशन किया गया।",
    "ZeroDivisionError": "शून्य भाग त्रुटि: आप 0 से भाग नहीं कर सकते।",
    "ValueError": "मान त्रुटि: गलत मान (value) पास किया गया।",
    "IndexError": "इंडेक्स त्रुटि: सूची/टपल में गलत इंडेक्स चुना गया।",
    "KeyError": "कुंजी त्रुटि: यह key शब्दकोश में मौजूद नहीं है।",
    "AttributeError": "विशेषता त्रुटि: यह attribute मौजूद नहीं है।",
    "ImportError": "आयात त्रुटि: मॉड्यूल आयात नहीं हो सका।",
    "FileNotFoundError": "फाइल त्रुटि: फाइल नहीं मिली।",
    "ModuleNotFoundError": "मॉड्यूल त्रुटि: मॉड्यूल नहीं मिला।"
}

message_translation = {
    "invalid syntax": "अमान्य सिंटैक्स: आपके कोड की संरचना सही नहीं है।",
    "forgot a comma": "शायद आपने अल्पविराम (,) लगाना भूल गए।",
    "not defined": "यह नाम परिभाषित नहीं है। पहले इसे घोषित करें।",
    "division by zero": "शून्य से भाग नहीं कर सकते।",
    "expected an indented block": "यहाँ indented block की जरूरत थी।",
    "unexpected indent": "अप्रत्याशित indentation मिला।",
    "list index out of range": "सूची का index सीमा से बाहर है।",
    "missing": "कुछ गायब है",
    "cannot import": "आयात नहीं हो सका",
    "unsupported operand": "यह ऑपरेशन इन डेटा टाइप्स पर काम नहीं करता।",
    "takes": "फंक्शन को गलत संख्या में arguments दिए गए।",
    "required positional argument": "आवश्यक argument नहीं दिया गया।"
}


def translate_error_message(error_msg: str) -> str:
    """
    Translate an error message string to Hindi
    """
    print(f"🔍 Translating error: {error_msg}")  # Debug log
    
    # Extract type and message
    if ":" in error_msg:
        err_type, err_details = error_msg.split(":", 1)
        err_type = err_type.strip()
        err_details = err_details.strip()
    else:
        err_type = "UnknownError"
        err_details = error_msg.strip()

    # Base translation by type
    base_msg = error_translation.get(err_type, "अज्ञात त्रुटि")
    print(f"📌 Error type: {err_type}, Base message: {base_msg}")  # Debug log

    # Check message fragments
    for eng_fragment, hindi_explanation in message_translation.items():
        if eng_fragment.lower() in err_details.lower():
            result = f"{base_msg} 👉 {hindi_explanation}"
            print(f"✅ Matched fragment '{eng_fragment}', Result: {result}")  # Debug log
            return result

    # Fallback
    result = f"{base_msg} 👉 {err_details}"
    print(f"⚠️ No fragment matched, using fallback: {result}")  # Debug log
    return result


def translate_exception(exception: Exception) -> str:
    """
    Translate a Python exception object to Hindi
    """
    return translate_error_message(f"{type(exception).__name__}: {str(exception)}")
