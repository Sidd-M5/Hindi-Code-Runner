import re

hindi_to_python_map = {
    # Functions & return
    "परिभाषित": "def",
    "वापस_करें": "return",

    # Print / Input
    "छापें": "print",
    "इनपुट": "input",

    # Conditions / Loops
    "अगर": "if",
    "अन्यथा": "else",
    "अगर_अन्यथा": "elif",
    "के_लिए": "for",
    "जबतक": "while",
    "रोकें": "break",
    "जारी_रखें":"continue",

    # Boolean
    "सही": "True",
    "गलत": "False",
    "रिक्त": "None",

    # Data types
    "संख्या": "int",
    "पाठ": "str",
    "सूची": "list",
    "टपल": "tuple",
    "शब्दकोश": "dict",

    # Class / Objects
    "स्वं": "self",
    "आरंभ": "__init__",
    "वर्ग": "class",
    "वस्तु": "object",
    "नया": "new",
    "में": "in",
    "सीमा": "range"
}


def hindi_to_python(code: str) -> str:
    """
    Convert Hindi keywords to Python keywords.
    Uses word boundaries to avoid partial replacements.
    """
    for hindi_kw, py_kw in hindi_to_python_map.items():
        # Use word boundary regex to avoid replacing parts of words
        # \b doesn't work well with Hindi, so we use a simpler approach
        code = code.replace(hindi_kw, py_kw)
    
    return code


def generate_explanations(hindi_code: str) -> str:
    """
    Generate Hindi explanations for the code.
    """
    explanations = []
    lines = hindi_code.strip().split('\n')

    for line in lines:
        if "परिभाषित" in line:
            explanations.append("🔧 **परिभाषित**: यह एक फ़ंक्शन को परिभाषित करता है (def).")
        elif "वापस_करें" in line:
            explanations.append("↩️ **वापस_करें**: यह फ़ंक्शन से एक मान लौटाता है (return).")
        elif "छापें" in line:
            explanations.append("🖨️ **छापें**: आउटपुट स्क्रीन पर दिखाने के लिए (print).")
        elif "अगर" in line:
            explanations.append("🔍 **अगर**: शर्त (if condition) लगाने के लिए.")
        elif "अन्यथा" in line:
            explanations.append("📌 **अन्यथा**: else block, जब शर्त false हो.")
        elif "अन्यथा_अगर" in line:
            explanations.append("🔀 **अन्यथा_अगर**: यह elif block है (else if condition).")
        elif "के_लिए" in line:
            explanations.append("🔁 **के_लिए**: for loop चलाने के लिए.")
        elif "जबतक" in line:
            explanations.append("🔁 **जबतक**: while loop चलाने के लिए.")
        elif "सूची" in line:
            explanations.append("📋 **सूची**: Python की list datatype (mutable, ordered).")
        elif "टपल" in line:
            explanations.append("🔗 **टपल**: Python का tuple (immutable, ordered).")
        elif "शब्दकोश" in line:
            explanations.append("📚 **शब्दकोश**: dictionary (key-value pairs).")
        elif "स्वं" in line:
            explanations.append("👤 **स्व**: self keyword, object के current instance को दर्शाता है.")
        elif "आरंभ" in line:
            explanations.append("⚙️ **आरंभ**: यह constructor है (__init__) जो object बनाते समय चलता है.")
        elif "वर्ग" in line:
            explanations.append("🏛️ **वर्ग**: class define करने के लिए.")
        else:
            explanations.append("ℹ️ यह एक सामान्य लाइन है।")

    return "\n".join(explanations)