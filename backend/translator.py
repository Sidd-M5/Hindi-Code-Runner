from errors import error_translation, message_translation

def translate_error_message(error_msg: str) -> str:
    """
    Translate an error message string to Hindi
    
    Args:
        error_msg: The error message string (e.g., "SyntaxError: invalid syntax")
    
    Returns:
        Translated error message in Hindi
    """
    # Extract error type from message
    err_type = "UnknownError"
    err_details = error_msg
    
    if ":" in error_msg:
        parts = error_msg.split(":", 1)
        err_type = parts[0].strip()
        err_details = parts[1].strip() if len(parts) > 1 else error_msg
    
    # Get base translation by error type
    if err_type in error_translation:
        base_msg = error_translation[err_type]
    else:
        base_msg = "अज्ञात त्रुटि"
    
    # Check for specific message patterns
    for eng_fragment, hindi_explanation in message_translation.items():
        if eng_fragment.lower() in error_msg.lower():
            return f"{base_msg} 👉 {hindi_explanation}"
    
    # If no specific pattern found, return base message with original details
    return f"{base_msg} 👉 {err_details}"


def translate_exception(exception: Exception) -> str:
    """
    Translate a Python exception object to Hindi
    
    Args:
        exception: Python exception object
    
    Returns:
        Translated error message in Hindi
    """
    err_type = type(exception).__name__
    err_msg = str(exception)
    
    # Build full error message
    full_msg = f"{err_type}: {err_msg}"
    return translate_error_message(full_msg)

# Add this at the bottom of your translator.py file
if __name__ == "__main__":
    print("Testing translate_error_message:")
    print("-" * 50)
    
    test = "ZeroDivisionError: division by zero"
    result = translate_error_message(test)
    
    print(f"Input:  {test}")
    print(f"Output: {result}")