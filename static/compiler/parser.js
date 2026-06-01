// static/compiler/parser.js
import { TOKENS } from "./tokens.js";

/**
 * Parser converts token array -> AST (list of nodes).
 * Node types:
 *  - ASSIGN {variable, value}
 *  - PRINT {value}    (value: expression string)
 *  - IF {condition, body, elifBlocks, elseBody}
 *  - WHILE {condition, body}
 *  - FOR {iterator, start, end, body}
 *  - FUNCTION {name, params, body}
 *  - CALL {name, args}
 *  - RETURN {value}
 *  - BREAK / CONTINUE
 *  - INPUT {prompt?}
 *  - CLASS {name, body}
 *
 * Note: parser works token-by-token using token.type (IDENTIFIER, NUMBER, STRING, KEYWORD, OPERATOR, SYMBOL).
 */

export function parse(tokens) {
  const ast = [];
  let i = 0;

  const peek = (offset = 0) => tokens[i + offset] ?? null;

  // collect tokens into a single expression string until encountering any of stopValues
  // 🧠 Collects expression until one of stop symbols *excluding parentheses or commas* 
  function collectExpressionUntil(...stopValues) {
    const parts = [];
    while (i < tokens.length) {
      const t = tokens[i];
      if (stopValues.includes(t?.value) || stopValues.includes(t?.type)) break;

      // 🧠 Detect negative numbers: OPERATOR '-' followed by NUMBER
      if (t.type === "OPERATOR" && t.value === "-" && tokens[i + 1]?.type === "NUMBER") {
        parts.push(`-${tokens[i + 1].value}`);
        i += 2;
        continue;
      }

      parts.push(t.value ?? "");
      i++;
    }
    return parts.join(" ").trim();
  }

  // collect tokens until a closing symbol (like ')') — assumes current token is after opening
  function collectUntilSymbol(symbol) {
    const parts = [];
    while (i < tokens.length && tokens[i].value !== symbol) {
      parts.push(tokens[i].value ?? "");
      i++;
    }
    return parts.join(" ").trim();
  }

  while (i < tokens.length) {
    const t = tokens[i];

    // ----- PRINT -----
    if (t.type === "KEYWORD" && t.value === "छापें") {
      i++;
      if (peek()?.value === "(") i++;
      const expr = collectUntilSymbol(")");
      if (peek()?.value === ")") i++; // skip ')'
      ast.push({ type: "PRINT", value: expr });
      continue;
    }

    // ----- FUNCTION DEF: परिभाषित name(params): body -----
    if (t.type === "KEYWORD" && t.value === "परिभाषित") {
      i++;
      const nameToken = peek();
      const name = nameToken?.value;
      if (nameToken) i++;

      // parameters (a, b)
      const params = [];
      if (peek()?.value === "(") {
        i++;
        while (peek() && peek().value !== ")") {
          if (peek().type === "IDENTIFIER") params.push(peek().value);
          i++;
        }
        if (peek()?.value === ")") i++;
      }

      if (peek()?.value === ":") i++;

      // function body (until a blank line or another keyword/identifier assignment)
      const body = [];
      while (i < tokens.length) {
        const nt = peek();
        if (!nt) break;

        // stop when we see a top-level identifier assignment (like परिणाम = ...)
        if (nt.type === "IDENTIFIER" && tokens[i + 1]?.value === "=") break;

        // stop on next top-level keyword (another def, loop, if, etc.)
        if (TOKENS.KEYWORDS.includes(nt.value) && !["वापस_करें", "छापें"].includes(nt.value))
          break;

        if (nt.value === "वापस_करें") {
          i++;
          const retExpr = collectExpressionUntil("NEWLINE", "KEYWORD");
          body.push({ type: "RETURN", value: retExpr });
          continue;
        }

        if (nt.value === "छापें") {
          i++;
          if (peek()?.value === "(") i++;
          const expr = collectUntilSymbol(")");
          if (peek()?.value === ")") i++;
          body.push({ type: "PRINT", value: expr });
          continue;
        }

        i++;
      }

      ast.push({ type: "FUNCTION", name, params, body });
      continue;
    }


    // ----- RETURN (top-level) -----
    if (t.type === "KEYWORD" && t.value === "वापस_करें") {
      i++;
      const value = collectExpressionUntil("KEYWORD", "SYMBOL");
      ast.push({ type: "RETURN", value });
      continue;
    }

    // ----- BREAK / CONTINUE -----
    if (t.type === "KEYWORD" && t.value === "रोकें") {
      i++;
      ast.push({ type: "BREAK" });
      continue;
    }
    if (t.type === "KEYWORD" && t.value === "जारी_रखें") {
      i++;
      ast.push({ type: "CONTINUE" });
      continue;
    }

    // ----- CLASS (basic) -----
    if (t.type === "KEYWORD" && t.value === "वर्ग") {
      i++;
      const name = peek()?.value;
      if (peek()) i++;
      if (peek()?.value === ":") i++;
      const body = [];
      while (i < tokens.length && !TOKENS.KEYWORDS.includes(peek()?.value)) {
        i++;
      }
      ast.push({ type: "CLASS", name, body });
      continue;
    }

    // ----- INPUT -----
    if (t.type === "KEYWORD" && t.value === "इनपुट") {
      i++;
      let promptText = "";
      if (peek()?.value === "(") {
        i++;
        promptText = collectUntilSymbol(")");
        if (peek()?.value === ")") i++;
      }
      ast.push({ type: "INPUT", prompt: promptText });
      continue;
    }

    // ----- IF / ELIF / ELSE -----
    if (t.type === "KEYWORD" && t.value === "अगर") {
      i++;
      const condition = collectExpressionUntil(":");
      if (peek()?.value === ":") i++;

      const body = [];
      while (
        i < tokens.length &&
        !["अगर_अन्यथा", "अन्यथा", "अगर", "जबतक", "के_लिए"].includes(peek()?.value)
      ) {
        if (peek()?.type === "KEYWORD" && peek().value === "छापें") {
          i++;
          if (peek()?.value === "(") i++;
          const expr = collectUntilSymbol(")");
          if (peek()?.value === ")") i++;
          body.push({ type: "PRINT", value: expr });
          continue;
        }
        if (peek()?.type === "IDENTIFIER" && peek(1)?.value === "=") {
          const variable = peek().value;
          i += 2;
          const value = collectExpressionUntil("KEYWORD", "SYMBOL");
          body.push({ type: "ASSIGN", variable, value });
          continue;
        }
        i++;
      }

      const ifNode = { type: "IF", condition, body, elifBlocks: [], elseBody: [] };

      // attach elif / else blocks
      while (true) {
        const next = peek();
        if (!next) break;

        // ----- elif (अगर_अन्यथा) -----
        if (next.type === "KEYWORD" && next.value === "अगर_अन्यथा") {
          i++;
          const elifCond = collectExpressionUntil(":");
          if (peek()?.value === ":") i++;

          const elifBody = [];
          while (
            i < tokens.length &&
            !["अगर_अन्यथा", "अन्यथा", "अगर", "जबतक", "के_लिए"].includes(peek()?.value)
          ) {
            if (peek()?.type === "KEYWORD" && peek().value === "छापें") {
              i++;
              if (peek()?.value === "(") i++;
              const expr = collectUntilSymbol(")");
              if (peek()?.value === ")") i++;
              elifBody.push({ type: "PRINT", value: expr });
              continue;
            }
            if (peek()?.type === "IDENTIFIER" && peek(1)?.value === "=") {
              const variable = peek().value;
              i += 2;
              const value = collectExpressionUntil("KEYWORD", "SYMBOL");
              elifBody.push({ type: "ASSIGN", variable, value });
              continue;
            }
            i++;
          }
          ifNode.elifBlocks.push({ condition: elifCond, body: elifBody });
          continue;
        }

        // ----- else (अन्यथा) -----
        if (next.type === "KEYWORD" && next.value === "अन्यथा") {
          i++;
          if (peek()?.value === ":") i++;

          const elseBody = [];
          while (
            i < tokens.length &&
            !["अगर", "जबतक", "के_लिए"].includes(peek()?.value)
          ) {
            if (peek()?.type === "KEYWORD" && peek().value === "छापें") {
              i++;
              if (peek()?.value === "(") i++;
              const expr = collectUntilSymbol(")");
              if (peek()?.value === ")") i++;
              elseBody.push({ type: "PRINT", value: expr });
              continue;
            }
            if (peek()?.type === "IDENTIFIER" && peek(1)?.value === "=") {
              const variable = peek().value;
              i += 2;
              const value = collectExpressionUntil("KEYWORD", "SYMBOL");
              elseBody.push({ type: "ASSIGN", variable, value });
              continue;
            }
            i++;
          }
          ifNode.elseBody = elseBody;
          continue;
        }

        break; // stop when a non-related keyword appears
      }

      ast.push(ifNode);
      continue;
    }


    // ----- WHILE -----
    if (t.type === "KEYWORD" && t.value === "जबतक") {
      i++;
      const condition = collectExpressionUntil(":");
      if (peek()?.value === ":") i++;
      const body = [];
      while (i < tokens.length && !["अगर", "अन्यथा", "के_लिए"].includes(peek()?.value)) {
        if (peek()?.type === "KEYWORD" && peek().value === "छापें") {
          i++;
          if (peek()?.value === "(") i++;
          const expr = collectUntilSymbol(")");
          if (peek()?.value === ")") i++;
          body.push({ type: "PRINT", value: expr });
          continue;
        }
        if (peek()?.type === "IDENTIFIER" && peek(1)?.value === "=") {
          const variable = peek().value;
          i += 2;
          const value = collectExpressionUntil("KEYWORD", "SYMBOL");
          body.push({ type: "ASSIGN", variable, value });
          continue;
        }
        i++;
      }
      ast.push({ type: "WHILE", condition, body });
      continue;
    }

    // ----- FOR: के_लिए var में सीमा(start,end): -----
    if (t.type === "KEYWORD" && t.value === "के_लिए") {
      i++;
      const iterator = peek()?.value;
      if (peek()) i++;
      // consume 'में' if present
      if (peek()?.value === "में") i++;
      // expect सीमा(...
      let start = 0, end = 0;
      if (peek()?.type === "IDENTIFIER" && peek().value.startsWith("सीमा")) {
        // parse token like सीमा(1,5) if lexer didn't split; else parse parenthesis style
        const text = peek().value;
        const match = text.match(/सीमा\(\s*([^,)\s]+)\s*(?:,\s*([^)\s]+)\s*)?\)/);
        if (match) {
          start = Number(match[1].replace(/[०-९]/g, d => "०१२३४५६७८९".indexOf(d)));
          end = Number((match[2] ?? 0).toString().replace(/[०-९]/g, d => "०१२३४५६७८९".indexOf(d)));
          i++;
        } else {
          // fallback: if tokens are ( सीमा ( start , end ) )
          if (peek()?.value === "सीमा") i++;
        }
      } else if (peek()?.value === "सीमा") {
        i++;
        if (peek()?.value === "(") i++;
        const s = collectUntilSymbol(",");
        if (peek()?.value === ",") i++;
        const e = collectUntilSymbol(")");
        if (peek()?.value === ")") i++;
        start = Number(s.replace(/[०-९]/g, d => "०१२३४५६७८९".indexOf(d)));
        end = Number(e.replace(/[०-९]/g, d => "०१२३४५६७८९".indexOf(d)));
      }
      if (peek()?.value === ":") i++;
      const body = [];
      while (i < tokens.length && !["अगर", "अन्यथा", "जबतक", "के_लिए"].includes(peek()?.value)) {
        if (peek()?.type === "KEYWORD" && peek().value === "छापें") {
          i++;
          if (peek()?.value === "(") i++;
          const expr = collectUntilSymbol(")");
          if (peek()?.value === ")") i++;
          body.push({ type: "PRINT", value: expr });
          continue;
        }
        if (peek()?.type === "IDENTIFIER" && peek(1)?.value === "=") {
          const variable = peek().value;
          i += 2;
          const value = collectExpressionUntil("KEYWORD", "SYMBOL");
          body.push({ type: "ASSIGN", variable, value });
          continue;
        }
        i++;
      }
      ast.push({ type: "FOR", iterator, start, end, body });
      continue;
    }


    // ----- FUNCTION CALL: जोड़(५, १०)
    // ----- ASSIGN (top-level fallback) -----
    // ----- ASSIGN (top-level fallback) -----
    if (t.type === "IDENTIFIER" && peek(1)?.value === "=") {
      const variable = t.value;
      i += 2; // skip var + '='

      // 🧠 Handle function call e.g. परिणाम = जोड़(५, १०)
      if (peek()?.type === "IDENTIFIER") {
        const funcName = peek().value;
        // look ahead to see if a '(' exists soon
        if (peek(1)?.value === "(" || peek(2)?.value === "(") {
          i++; // move after function name
          while (peek()?.value !== "(" && i < tokens.length) i++; // skip until '('
          if (peek()?.value === "(") i++; // skip '('
          const args = collectUntilSymbol(")");
          if (peek()?.value === ")") i++;
          const value = `${funcName}(${args})`;
          ast.push({ type: "ASSIGN", variable, value });
          continue;
        }
      }

      // 🧠 Otherwise: normal expression or number
      const value = collectExpressionUntil("KEYWORD", "SYMBOL", "NEWLINE");
      ast.push({ type: "ASSIGN", variable, value });
      continue;
    }



    // Fallback: skip token
    i++;
  }

  return ast;
}
