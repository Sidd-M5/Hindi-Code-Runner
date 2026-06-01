export function interpret(ast, inputProvider = null) {
  const env = {}; // symbol table: vars, funcs, classes
  const output = [];

  const normalizeDigits = (s) =>
    String(s).replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));

  // ==========================================================
  // 🔍 Expression Evaluator
  // ==========================================================
  function evalExpr(expr, localEnv = env) {
    if (expr === undefined || expr === null) return "";

    if (typeof expr === "number" || typeof expr === "boolean") return expr;

    expr = String(expr).trim();
    if (expr === "") return "";
    expr = normalizeDigits(expr);

    // --- handle dot-access (स्वं.नाम / obj.prop)
    const dotMatch = expr.match(/^([^.]+)\.(.+)$/);
    if (dotMatch) {
      const objName = dotMatch[1];
      const prop = dotMatch[2];
      const obj = localEnv[objName] ?? env[objName];
      if (typeof obj === "object" && obj !== null) {
        if (typeof obj[prop] === "function") return obj[prop]; // for methods
        return obj[prop];
      }
    }

    // --- function or class call (व्यक्ति("राम", २५))
    const callMatch = expr.match(/^([^\s(]+)\s*\((.*)\)$/);
    if (callMatch) {
      const name = callMatch[1].trim();
      const argsRaw = callMatch[2].trim();
      const args = argsRaw === "" ? [] : splitArgs(argsRaw).map((a) => evalExpr(a, localEnv));

      // class instantiation
      if (env[name] && env[name].type === "CLASS") {
        return createInstance(name, args);
      }

      // user-defined function
      if (env[name] && env[name].type === "USER_FUNC") {
        return callFunction(name, args);
      }
    }

    // --- binary operations (+ - * / < > == != <= >=)
    const binMatch = expr.match(/(.+?)\s*(==|!=|<=|>=|<|>|[\+\-\*\/])\s*(.+)/);
    if (binMatch) {
      const left = evalExpr(binMatch[1].trim(), localEnv);
      const op = binMatch[2];
      const right = evalExpr(binMatch[3].trim(), localEnv);
      switch (op) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
        case "<": return left < right;
        case ">": return left > right;
        case "==": return left == right;
        case "!=": return left != right;
        case "<=": return left <= right;
        case ">=": return left >= right;
      }
    }

    // --- comma separated (print style)
    if (expr.includes(",")) {
      return expr.split(",").map((part) => evalExpr(part.trim(), localEnv)).join(" ");
    }

    // --- quoted string
    if (/^['"].*['"]$/.test(expr)) return expr.slice(1, -1);

    // --- booleans
    if (["सही", "True", "true"].includes(expr)) return true;
    if (["गलत", "False", "false"].includes(expr)) return false;

    // --- numeric
    if (!isNaN(expr)) return Number(expr);

    // --- variable lookup
    if (localEnv.hasOwnProperty(expr)) return localEnv[expr];
    if (env.hasOwnProperty(expr)) return env[expr];

    // fallback
    return expr;
  }

  // ==========================================================
  // 🔠 Split arguments safely (handles nested strings)
  // ==========================================================
  function splitArgs(s) {
    const parts = [];
    let cur = "", depth = 0, inStr = false, strChar = null;
    for (let ch of s) {
      if (inStr) {
        cur += ch;
        if (ch === strChar) { inStr = false; strChar = null; }
        continue;
      }
      if (ch === "'" || ch === '"') { inStr = true; strChar = ch; cur += ch; continue; }
      if (ch === "(") { depth++; cur += ch; continue; }
      if (ch === ")") { depth--; cur += ch; continue; }
      if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    if (cur.trim() !== "") parts.push(cur.trim());
    return parts;
  }

  // ==========================================================
  // ⚙️ Function Calls
  // ==========================================================
  function callFunction(name, args, context = env, thisObj = null) {
    const fn = context[name] || env[name];
    if (!fn || fn.type !== "USER_FUNC")
      throw new Error(`Undefined or invalid function: ${name}`);

    const oldEnv = { ...env };
    try {
      fn.params.forEach((p, idx) => {
        env[p] = args[idx];
      });
      if (thisObj) env["स्वं"] = thisObj;

      try {
        run(fn.body);
      } catch (ret) {
        if (ret && ret.type === "RETURN_SIGNAL") return ret.value;
        throw ret;
      }
      return null;
    } finally {
      // restore old env but keep class/function defs
      for (const k of Object.keys(env)) {
        if (!(k in oldEnv)) delete env[k];
      }
      for (const [k, v] of Object.entries(oldEnv)) {
        env[k] = v;
      }
    }
  }

  // ==========================================================
  // 🏗️ Class System
  // ==========================================================
  function createInstance(className, args) {
    const cls = env[className];
    if (!cls || cls.type !== "CLASS")
      throw new Error(`Unknown class: ${className}`);

    const instance = {}; // object instance
    // attach methods
    for (const [mName, mDef] of Object.entries(cls.methods)) {
      instance[mName] = (...callArgs) =>
        callFunction(mName, callArgs, cls.methods, instance);
    }

    // constructor (आरंभ)
    if (cls.methods["आरंभ"]) {
      callFunction("आरंभ", args, cls.methods, instance);
    }

    return instance;
  }

  // ==========================================================
  // 🏃 Node Executor
  // ==========================================================
  function run(nodes) {
    for (const node of nodes) {
      switch (node.type) {
        case "ASSIGN":
          if (node.variable.includes(".")) {
            const [objName, prop] = node.variable.split(".");
            const obj = env[objName];
            if (typeof obj === "object") obj[prop] = evalExpr(node.value);
          } else {
            env[node.variable] = evalExpr(node.value);
          }
          break;

        case "PRINT":
          output.push(String(evalExpr(node.value)));
          break;

        case "FUNCTION":
          env[node.name] = { type: "USER_FUNC", params: node.params, body: node.body };
          break;

        case "CLASS":
          const cls = { type: "CLASS", name: node.name, methods: {} };
          env[node.name] = cls;

          // find subsequent function definitions
          let j = ast.indexOf(node) + 1;
          while (j < ast.length && ast[j].type === "FUNCTION") {
            cls.methods[ast[j].name] = {
              type: "USER_FUNC",
              params: ast[j].params,
              body: ast[j].body,
            };
            j++;
          }
          break;

        case "IF":
          const cond = evalExpr(node.condition);
          if (cond) run(node.body);
          else {
            let executed = false;
            if (node.elifBlocks?.length) {
              for (const elif of node.elifBlocks) {
                if (evalExpr(elif.condition)) {
                  run(elif.body);
                  executed = true;
                  break;
                }
              }
            }
            if (!executed && node.elseBody?.length) run(node.elseBody);
          }
          break;

        case "RETURN":
          throw { type: "RETURN_SIGNAL", value: evalExpr(node.value) };

        case "FOR":
          const start = Number(evalExpr(node.start));
          const end = Number(evalExpr(node.end));
          for (let i = start; i < end; i++) {
            env[node.iterator] = i;
            run(node.body);
          }
          break;

        case "WHILE":
          while (evalExpr(node.condition)) run(node.body);
          break;

        default:
          break;
      }
    }
  }

  // ==========================================================
  // 🚀 Run Program
  // ==========================================================
  run(ast);
  return output.join("\n");
}
