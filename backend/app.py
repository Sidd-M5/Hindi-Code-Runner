from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from transpiler import generate_explanations, hindi_to_python
from executor import run_python_code
from flask_sqlalchemy import SQLAlchemy
from errors import translate_error_message, error_translation, message_translation
from deep_translator import GoogleTranslator
import sqlite3

def init_db():
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

# Run DB initialization when server starts
init_db()

# Adjust template/static folder paths based on your structure
app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.secret_key = "supsecretkey"
translator = GoogleTranslator()

# SQLite database file will be created in project folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)  # For now plain-text, later use hashing


# Create DB tables (run once before starting server)
with app.app_context():
    db.create_all()


def normalize_hindi_numbers(code: str) -> str:
    hindi_to_english = {
        '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
        '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
    }
    return ''.join(hindi_to_english.get(ch, ch) for ch in code)


# ----------------- ROUTES ----------------- #

# Homepage (tutorial landing page)
@app.route("/")
def home():
    return render_template("home.html")


# Hindi code runner (editor page)
@app.route("/runner")
def editor():
    if not session.get("logged_in"):
        return redirect(url_for("login"))
    return render_template("index.html", logged_in=True)


# Login page
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        conn = sqlite3.connect("users.db")
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        user = c.fetchone()
        conn.close()

        if user:
            session["logged_in"] = True
            session["username"] = username
            return redirect(url_for("editor"))
        else:
            return render_template("login.html", error="गलत यूज़रनेम या पासवर्ड")

    return render_template("login.html")



# Signup page
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        conn = sqlite3.connect("users.db")
        c = conn.cursor()

        try:
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
            conn.commit()
        except sqlite3.IntegrityError:
            return render_template("signup.html", error="⚠️ यह यूज़रनेम पहले से मौजूद है")
        finally:
            conn.close()

        return redirect(url_for("login"))

    return render_template("signup.html")


# Logout route
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))


# Run Hindi code (backend API)
@app.route("/run", methods=["POST"])
def run_code():
    data = request.get_json()
    hindi_code = data.get("hindi_code", "")
    hindi_code = normalize_hindi_numbers(hindi_code)

    output = ""
    error_msg = None
    python_code = ""

    try:
        # Convert Hindi code to Python (this can also throw errors)
        python_code = hindi_to_python(hindi_code)
        
        # ✅ Run transpiled Python code
        output = run_python_code(python_code)

    except SyntaxError as e:
        # Handle syntax errors specially
        error_msg = f"SyntaxError: {str(e)}"
        
        # Custom translation for common syntax errors
        error_details = str(e).lower()
        if "was never closed" in error_details:
            if "(" in error_details:
                output = "सिंटैक्स त्रुटि: '(' को बंद नहीं किया गया। कृपया ')' जोड़ें।"
            elif "[" in error_details:
                output = "सिंटैक्स त्रुटि: '[' को बंद नहीं किया गया। कृपया ']' जोड़ें।"
            elif "{" in error_details:
                output = "सिंटैक्स त्रुटि: '{' को बंद नहीं किया गया। कृपया '}' जोड़ें।"
            elif "'" in error_details or '"' in error_details:
                output = "सिंटैक्स त्रुटि: उद्धरण चिह्न को बंद नहीं किया गया। कृपया उद्धरण बंद करें।"
            else:
                output = "सिंटैक्स त्रुटि: कोड में कोई चिह्न बंद नहीं हुआ।"
        elif "invalid syntax" in error_details:
            output = "सिंटैक्स त्रुटि: अमान्य सिंटैक्स। कृपया अपने कोड की संरचना जांचें।"
        elif "unexpected indent" in error_details:
            output = "सिंटैक्स त्रुटि: अप्रत्याशित indentation मिला।"
        elif "expected an indented block" in error_details:
            output = "सिंटैक्स त्रुटि: यहाँ indented block की जरूरत थी।"
        else:
            # Use your custom translation function
            output = translate_error_message(error_msg)
            
            # Fallback to Deep Translator if still English
            if output == error_msg or "SyntaxError:" in output:
                try:
                    output = GoogleTranslator(source="auto", target="hi").translate(str(e))
                    output = f"सिंटैक्स त्रुटि: {output}"
                except Exception:
                    output = f"सिंटैक्स त्रुटि: {str(e)}"

    except Exception as e:
        # Handle all other errors
        error_msg = f"{type(e).__name__}: {str(e)}"

        # ✅ Try your custom Hindi mapping first
        output = translate_error_message(error_msg)

        # ✅ If still English-looking, fallback to Deep Translator
        if output == error_msg or type(e).__name__ in output:
            try:
                translated = GoogleTranslator(source="auto", target="hi").translate(str(e))
                error_type_hindi = error_translation.get(type(e).__name__, "त्रुटि")
                output = f"{error_type_hindi}: {translated}"
            except Exception:
                output = translate_error_message(error_msg)

    # Generate Hindi explanation (you already have this)
    explanation = generate_explanations(hindi_code) if not error_msg else "⚠️ आपके कोड में एक त्रुटि है।"

    response = {
        "output": output,
        "translated_code": python_code,
        "explanation": explanation
    }

    # Include raw English error for debugging or frontend use
    if error_msg:
        response["error"] = error_msg

    return jsonify(response)


@app.route("/translate_output", methods=["POST"])
def translate_output():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()
        print("🔹 Text received for translation:", repr(text))  # Debug log

        if not text:
            return jsonify({"error": "No text provided", "translated": None}), 400

        translated_text = GoogleTranslator(source="auto", target="en").translate(text)
        print("🔹 Translated text:", repr(translated_text))  # Debug log

        return jsonify({"translated": translated_text})

    except Exception as e:
        print("❌ Translation error:", e)  # Show actual error in server logs
        return jsonify({"error": str(e), "translated": None}), 500
    
    #Error Translation
@app.route("/translate_error", methods=["POST"])
def translate_error_endpoint():
    """
    Translate any error message to Hindi using Deep Translator.
    """
    try:
        data = request.get_json()
        if not data or "error" not in data:
            return jsonify({"error": "No error message provided"}), 400
        
        error_msg = data["error"]

        # Translate the error message to Hindi
        translated = GoogleTranslator(source='auto', target='hi').translate(error_msg)

        return jsonify({
            "error_hindi": translated,
            "original_error": error_msg
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Translation API failed: {str(e)}"
        }), 500




if __name__ == "__main__":
    app.run(debug=True)
