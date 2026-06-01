// static/compiler/lexer.js
import { TOKENS } from "./tokens.js";

export function tokenize(code) {
  const tokens = [];

  // 🔢 Convert Hindi digits → Latin digits
  const toLatinDigits = (s) =>
    s.replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));

  // --- STEP 0: Protect multi-character operators ---
  const multiOps = ["==", "!=", "<=", ">="];
  multiOps.forEach((op, i) => {
    const placeholder = `__OP${i}__`;
    const re = new RegExp(op.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    code = code.replace(re, ` ${placeholder} `);
  });

  // --- STEP 1: Insert virtual newlines after ) or : before keywords ---
  code = code
    .replace(/\)\s*(अगर_अन्यथा|अगर|अन्यथा|जबतक|के_लिए)/g, ")\n$1")
    .replace(/:\s*(अगर_अन्यथा|अगर|अन्यथा|जबतक|के_लिए)/g, ":\n$1");

  // --- STEP 2: Add spacing around remaining single-character symbols/operators ---
  code = code.replace(/([(){}:,\+\-\*\/=<>\[\]])/g, " $1 ");

  // --- STEP 3: Restore multi-character operators ---
  multiOps.forEach((op, i) => {
    const placeholder = `__OP${i}__`;
    const re = new RegExp(placeholder, "g");
    code = code.replace(re, ` ${op} `);
  });

  // --- STEP 4: Tokenize safely, preserving strings ---
  const parts = [];
  let current = "";
  let inString = false;
  let quote = null;

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];

    if ((ch === '"' || ch === "'") && !inString) {
      if (current.trim()) parts.push(current.trim());
      current = ch;
      inString = true;
      quote = ch;
      continue;
    }

    if (inString) {
      current += ch;
      if (ch === quote) {
        parts.push(current.trim());
        current = "";
        inString = false;
        quote = null;
      }
      continue;
    }

    if (ch === "\n") {
      if (current.trim()) parts.push(current.trim());
      parts.push("\n");
      current = "";
    } else if (/\s/.test(ch)) {
      if (current.trim()) {
        parts.push(current.trim());
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());

  // --- STEP 5: Classify tokens ---
  for (let i = 0; i < parts.length; i++) {
    const raw = parts[i];

    if (raw === "\n") {
      tokens.push({ type: "NEWLINE", value: "\\n" });
      continue;
    }

    // --- KEYWORDS ---
    if (TOKENS.KEYWORDS.includes(raw)) {
      tokens.push({ type: "KEYWORD", value: raw });
      continue;
    }

    // --- BOOLEAN ---
    if (TOKENS.BOOLEAN.includes(raw)) {
      tokens.push({ type: "BOOLEAN", value: raw === "सही" });
      continue;
    }

    // --- DATATYPES (smart detection for variable use) ---
    if (TOKENS.DATATYPES.includes(raw)) {
      // 🧠 Look ahead to detect if used like a variable (संख्या = ५ or संख्या < ५)
      const next = parts[i + 1];
      if (next === "=" || TOKENS.OPERATORS.includes(next)) {
        tokens.push({ type: "IDENTIFIER", value: raw });
      } else {
        tokens.push({ type: "DATATYPE", value: raw });
      }
      continue;
    }

    // --- OPERATORS ---
    if (multiOps.includes(raw) || TOKENS.OPERATORS.includes(raw)) {
      tokens.push({ type: "OPERATOR", value: raw });
      continue;
    }

    // --- SYMBOLS ---
    if (TOKENS.SYMBOLS.includes(raw)) {
      tokens.push({ type: "SYMBOL", value: raw });
      continue;
    }

    // --- VALUES (like रिक्त / None) ---
    if (TOKENS.VALUES.includes(raw)) {
      tokens.push({ type: "VALUE", value: null });
      continue;
    }

    // --- STRINGS ---
    if (/^['"].*['"]$/.test(raw)) {
      tokens.push({ type: "STRING", value: raw.slice(1, -1) });
      continue;
    }

    // --- NUMBERS (support negative) ---
    if (/^-?[०-९0-9]+$/.test(raw)) {
      tokens.push({
        type: "NUMBER",
        value: Number(toLatinDigits(raw.replace("−", "-"))), // also handle Unicode minus
      });
      continue;
    }


    // --- DEFAULT IDENTIFIER ---
    tokens.push({ type: "IDENTIFIER", value: raw });
  }

  return tokens;
}
