// Default LaTeX to speech translation mappings
export const defaultLatexMappings: Record<string, string> = {
  // Fractions
  "\\frac": "start fraction where numerator equals",
  // Greek letters
  "\\alpha": "alpha",
  "\\beta": "beta",
  "\\gamma": "gamma",
  "\\delta": "delta",
  "\\epsilon": "epsilon",
  "\\zeta": "zeta",
  "\\eta": "eta",
  "\\theta": "theta",
  "\\iota": "iota",
  "\\kappa": "kappa",
  "\\lambda": "lambda",
  "\\mu": "mu",
  "\\nu": "nu",
  "\\xi": "xi",
  "\\omicron": "omicron",
  "\\pi": "pi",
  "\\rho": "rho",
  "\\sigma": "sigma",
  "\\tau": "tau",
  "\\upsilon": "upsilon",
  "\\phi": "phi",
  "\\chi": "chi",
  "\\psi": "psi",
  "\\omega": "omega",
  // Uppercase Greek letters
  "\\Alpha": "capital alpha",
  "\\Beta": "capital beta",
  "\\Gamma": "capital gamma",
  "\\Delta": "capital delta",
  "\\Epsilon": "capital epsilon",
  "\\Zeta": "capital zeta",
  "\\Eta": "capital eta",
  "\\Theta": "capital theta",
  "\\Iota": "capital iota",
  "\\Kappa": "capital kappa",
  "\\Lambda": "capital lambda",
  "\\Mu": "capital mu",
  "\\Nu": "capital nu",
  "\\Xi": "capital xi",
  "\\Omicron": "capital omicron",
  "\\Pi": "capital pi",
  "\\Rho": "capital rho",
  "\\Sigma": "capital sigma",
  "\\Tau": "capital tau",
  "\\Upsilon": "capital upsilon",
  "\\Phi": "capital phi",
  "\\Chi": "capital chi",
  "\\Psi": "capital psi",
  "\\Omega": "capital omega",
  // Symbols
  "\\sim": "tilde symbol",
  "\\approx": "approximately equal to",
  "\\neq": "not equal to",
  "\\leq": "less than or equal to",
  "\\geq": "greater than or equal to",
  "\\ll": "much less than",
  "\\gg": "much greater than",
  "\\in": "element of",
  "\\notin": "not an element of",
  "\\subset": "subset of",
  "\\supset": "superset of",
  "\\cup": "union",
  "\\cap": "intersection",
  "\\emptyset": "empty set",
  "\\infty": "infinity",
  "\\partial": "partial derivative",
  "\\nabla": "nabla",
  "\\forall": "for all",
  "\\exists": "there exists",
  "\\nexists": "there does not exist",
  "\\therefore": "therefore",
  "\\because": "because",
  "\\pm": "plus or minus",
  "\\mp": "minus or plus",
  "\\times": "times",
  "\\div": "divided by",
  "\\cdot": "dot",
  "\\ast": "asterisk",
  // Decorations
  "\\bar": "with straight top hat",
  "\\hat": "with hat",
  "\\tilde": "with tilde",
  "\\vec": "vector",
  "\\dot": "with dot",
  "\\ddot": "with double dot",
  // Brackets
  "\\left(": "open parenthesis",
  "\\right)": "close parenthesis",
  "\\left[": "open bracket",
  "\\right]": "close bracket",
  "\\left\\{": "open curly brace",
  "\\right\\}": "close curly brace",
  "\\left|": "open vertical bar",
  "\\right|": "close vertical bar",
  // Functions
  "\\sin": "sine",
  "\\cos": "cosine",
  "\\tan": "tangent",
  "\\csc": "cosecant",
  "\\sec": "secant",
  "\\cot": "cotangent",
  "\\arcsin": "arc sine",
  "\\arccos": "arc cosine",
  "\\arctan": "arc tangent",
  "\\sinh": "hyperbolic sine",
  "\\cosh": "hyperbolic cosine",
  "\\tanh": "hyperbolic tangent",
  "\\log": "logarithm",
  "\\ln": "natural logarithm",
  "\\exp": "exponential function",
  "\\lim": "limit",
  "\\sum": "summation",
  "\\prod": "product",
  "\\int": "integral",
  "\\iint": "double integral",
  "\\iiint": "triple integral",
  // Distributions
  N: "normal distribution",
  // Subscripts and superscripts
  _: "subscript",
  "^": "superscript",
  // Special characters
  "\\sqrt": "square root of",
  "\\nthroot": "nth root of",
  "\\overline": "overline",
  "\\underline": "underline",
  "\\overbrace": "overbrace",
  "\\underbrace": "underbrace",
}

/**
 * Parse LaTeX expressions into speech-friendly text
 */
export function parseLatex(text: string, customMappings: Record<string, string> = defaultLatexMappings): string {
  if (!text) return ""

  let result = text

  // Add "Starting a math equation" for inline math mode
  result = result.replace(/\$(.*?)\$/g, "Starting a math equation, $1, end of equation")

  // Add "Starting a math equation" for display math mode
  result = result.replace(/\$\$(.*?)\$\$/g, "Starting a math equation, $1, end of equation")

  // Process fractions
  result = result.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (match, numerator, denominator) => {
    return `start fraction where numerator is ${numerator}, and where denominator is ${denominator}, end fraction`
  })

  // Process nested fractions (simplified approach)
  result = result.replace(
    /\\frac\{([^{}]*(\{[^{}]*\})*[^{}]*)\}\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g,
    (match, numerator, _, denominator) => {
      return `start fraction where numerator is ${numerator}, and where denominator is ${denominator}, end fraction`
    },
  )

  // Process square roots
  result = result.replace(/\\sqrt\{([^{}]*)\}/g, (match, content) => {
    return `square root of ${content}`
  })

  // Process nth roots
  result = result.replace(/\\sqrt\[([^[\]]*)\]\{([^{}]*)\}/g, (match, n, content) => {
    return `${n}th root of ${content}`
  })

  // Process subscripts
  result = result.replace(/_\{([^{}]*)\}/g, (match, content) => {
    return ` subscript ${content} end subscript`
  })

  // Process superscripts
  result = result.replace(/\^\{([^{}]*)\}/g, (match, content) => {
    return ` superscript ${content} end superscript`
  })

  // Process decorations like \bar{X}
  result = result.replace(/\\bar\{([^{}]*)\}/g, (match, content) => {
    return `${content} with straight top hat`
  })

  result = result.replace(/\\hat\{([^{}]*)\}/g, (match, content) => {
    return `${content} with hat`
  })

  // Process simple commands using custom mappings
  for (const [command, replacement] of Object.entries(customMappings)) {
    // Skip commands that have been handled specifically above
    if (["\\frac", "\\sqrt", "\\bar", "\\hat", "_", "^"].includes(command)) continue

    // Replace the command with its verbal equivalent
    // Properly escape special regex characters in the command
    const escapedCommand = command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(escapedCommand, "g")
    result = result.replace(regex, replacement)
  }

  // Clean up any remaining LaTeX commands (simplified approach)
  result = result.replace(/\\[a-zA-Z]+/g, (match) => {
    return match.substring(1) // Remove the backslash
  })

  return result
}
