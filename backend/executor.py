import sys
from io import StringIO

def run_python_code(code):
    """
    Execute Python code and capture output.
    Raises exceptions so they can be handled by Flask route.
    """
    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()
    
    try:
        # Let exceptions bubble up to Flask
        exec(code, {}, {})
    finally:
        # Always restore stdout
        sys.stdout = old_stdout
    
    return redirected_output.getvalue()