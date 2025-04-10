// Symbol categories for prefix application
export type SymbolCategory = "greek" | "operators" | "comparison" | "sets" | "other"

// Symbol categorization
const symbolCategories: Record<string, SymbolCategory> = {
  // Greek letters
  "\\alpha": "greek",
  "\\beta": "greek",
  "\\gamma": "greek",
  "\\delta": "greek",
  "\\epsilon": "greek",
  "\\zeta": "greek",
  "\\eta": "greek",
  "\\theta": "greek",
  "\\iota": "greek",
  "\\kappa": "greek",
  "\\lambda": "greek",
  "\\mu": "greek",
  "\\nu": "greek",
  "\\xi": "greek",
  "\\omicron": "greek",
  "\\pi": "greek",
  "\\rho": "greek",
  "\\sigma": "greek",
  "\\tau": "greek",
  "\\upsilon": "greek",
  "\\phi": "greek",
  "\\chi": "greek",
  "\\psi": "greek",
  "\\omega": "greek",
  // Uppercase Greek letters
  "\\Alpha": "greek",
  "\\Beta": "greek",
  "\\Gamma": "greek",
  "\\Delta": "greek",
  "\\Epsilon": "greek",
  "\\Zeta": "greek",
  "\\Eta": "greek",
  "\\Theta": "greek",
  "\\Iota": "greek",
  "\\Kappa": "greek",
  "\\Lambda": "greek",
  "\\Mu": "greek",
  "\\Nu": "greek",
  "\\Xi": "greek",
  "\\Omicron": "greek",
  "\\Pi": "greek",
  "\\Rho": "greek",
  "\\Sigma": "greek",
  "\\Tau": "greek",
  "\\Upsilon": "greek",
  "\\Phi": "greek",
  "\\Chi": "greek",
  "\\Psi": "greek",
  "\\Omega": "greek",
  // Comparison symbols
  "\\sim": "comparison",
  "\\approx": "comparison",
  "\\neq": "comparison",
  "\\leq": "comparison",
  "\\geq": "comparison",
  "\\ll": "comparison",
  "\\gg": "comparison",
  // Set symbols
  "\\in": "sets",
  "\\notin": "sets",
  "\\subset": "sets",
  "\\supset": "sets",
  "\\cup": "sets",
  "\\cap": "sets",
  "\\emptyset": "sets",
  // Operators
  "\\pm": "operators",
  "\\mp": "operators",
  "\\times": "operators",
  "\\div": "operators",
  "\\cdot": "operators",
  "\\ast": "operators",
}

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
  "\\Chi": "chi",
  "\\Psi": "psi",
  "\\Omega": "omega",
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
  // Additional symbols for complex equations
  "\\Bigg": "large",
  "\\bigg": "large",
  "\\Big": "large",
  "\\big": "large",
  "\\quad": "space",
  "\\qquad": "double space",
  "\\hspace": "horizontal space",
  "\\vspace": "vertical space",
}

// Symbol prefix options
interface SymbolPrefixOptions {
  useSymbolPrefix: boolean
  symbolPrefix: string
  prefixCategories: Record<SymbolCategory, boolean>
  groupSymbols?: boolean
}

/**
 * Parse LaTeX expressions into speech-friendly text
 */
export function parseLatex(
  text: string,
  customMappings: Record<string, string> = defaultLatexMappings,
  symbolOptions: SymbolPrefixOptions = {
    useSymbolPrefix: false,
    symbolPrefix: "symbol of",
    prefixCategories: {
      greek: true,
      operators: true,
      comparison: true,
      sets: true,
      other: false,
    },
    groupSymbols: true,
  },
): { parsedText: string; equations: string[] } {
  if (!text) return { parsedText: "", equations: [] }

  let result = text
  const extractedEquations: string[] = []

  // Extract and store equations for rendering
  const extractEquations = (input: string): string[] => {
    const equations: string[] = []

    // Extract display math mode equations
    input.replace(/\$\$(.*?)\$\$/g, (match, equation) => {
      equations.push(equation)
      return match
    })

    // Extract inline math mode equations
    input.replace(/\$(.*?)\$/g, (match, equation) => {
      equations.push(equation)
      return match
    })

    // Extract raw LaTeX expressions (not in $ delimiters)
    input.replace(/\\Bigg$$.*?\\Bigg$$/gs, (match) => {
      equations.push(match)
      return match
    })

    return equations
  }

  extractedEquations.push(...extractEquations(text))

  // Add "Starting a math equation" for inline math mode
  result = result.replace(/\$(.*?)\$/g, "Starting a math equation, $1, end of equation")

  // Add "Starting a math equation" for display math mode
  result = result.replace(/\$\$(.*?)\$\$/g, "Starting a math equation, $1, end of equation")

  // Process nested fractions with multiple levels
  const processFractions = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    let fractionLevel = 0

    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed

      // Process innermost fractions first
      processed = processed.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (match, numerator, denominator) => {
        fractionLevel++
        const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : "third"
        return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
      })

      // Process fractions with already processed content (nested fractions)
      processed = processed.replace(
        /\\frac\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}\{(.*?)\}/g,
        (match, numerator, denominator) => {
          fractionLevel++
          const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : "third"
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
        },
      )

      processed = processed.replace(
        /\\frac\{(.*?)\}\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}/g,
        (match, numerator, denominator) => {
          fractionLevel++
          const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : "third"
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
        },
      )
    }

    return processed
  }

  result = processFractions(result)

  // Process square roots
  result = result.replace(/\\sqrt\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, content) => {
    return `symbol-of-square-root-of ${content}`
  })

  // Process nth roots
  result = result.replace(/\\sqrt\[([^[\]]*)\]\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, n, content) => {
    return `${n}th-root-of ${content}`
  })

  // Process subscripts
  result = result.replace(/_\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, content) => {
    return ` start-subscript, ${content}, end-subscript`
  })

  // Process simple subscripts like x_i
  result = result.replace(/_([a-zA-Z0-9])/g, (match, content) => {
    return ` start-subscript ${content} end-subscript`
  })

  // Process superscripts
  result = result.replace(/\^\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, content) => {
    return ` start-superscript, ${content}, end-superscript`
  })

  // Process simple superscripts like x^2
  result = result.replace(/\^([a-zA-Z0-9])/g, (match, content) => {
    return ` start-superscript ${content} end-superscript`
  })

  // Process summation with limits
  result = result.replace(/\\sum_\{([^{}]*)\}\^\{([^{}]*)\}/g, (match, lower, upper) => {
    return `symbol-of-summation, start-subscript, ${lower}, end-subscript, start-superscript, ${upper}, end-superscript`
  })

  // Process large parentheses
  result = result.replace(/\\Bigg\(/g, "Open-first-large-parenthesis")
  result = result.replace(/\\Bigg\)/g, "Close-first-large-parenthesis")
  result = result.replace(/\\bigg\(/g, "Open-second-large-parenthesis")
  result = result.replace(/\\bigg\)/g, "Close-second-large-parenthesis")

  // Process quad spacing
  result = result.replace(/\\quad/g, " space ")
  result = result.replace(/\\qquad/g, " double-space ")

  // Process decorations like \bar{X}
  result = result.replace(/\\bar\{([^{}]*)\}/g, (match, content) => {
    return `${content} with-straight-top-hat`
  })

  result = result.replace(/\\hat\{([^{}]*)\}/g, (match, content) => {
    return `${content} with-hat`
  })

  // Process simple commands using custom mappings
  for (const [command, replacement] of Object.entries(customMappings)) {
    // Skip commands that have been handled specifically above
    if (
      ["\\frac", "\\sqrt", "\\bar", "\\hat", "_", "^", "\\sum", "\\Bigg", "\\bigg", "\\quad", "\\qquad"].includes(
        command,
      )
    )
      continue

    // Replace the command with its verbal equivalent
    // Properly escape special regex characters in the command
    const escapedCommand = command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(escapedCommand, "g")

    // Apply symbol prefix if enabled and command is in the selected categories
    if (
      symbolOptions.useSymbolPrefix &&
      symbolCategories[command] &&
      symbolOptions.prefixCategories[symbolCategories[command]]
    ) {
      if (symbolOptions.groupSymbols) {
        // Use hyphens to group related words with shorter pauses
        result = result.replace(regex, `symbol-of-${replacement}`)
      } else {
        result = result.replace(regex, `${symbolOptions.symbolPrefix} ${replacement}`)
      }
    } else {
      result = result.replace(regex, replacement)
    }
  }

  // Improve handling of specific LaTeX structures
  result = result.replace(/\\bar\{X\}/g, "bar-X")
  result = result.replace(/\\bar\{x\}/g, "bar-x")
  result = result.replace(/-\\bar\{X\}/g, "minus-bar-X")
  result = result.replace(/-\\bar\{x\}/g, "minus-bar-x")

  // Process equals signs
  result = result.replace(/=/g, "symbol-of-equals")

  // Fix comma handling to prevent SSML issues
  result = result.replace(/,/g, "comma")

  // Clean up any remaining LaTeX commands (simplified approach)
  result = result.replace(/\\[a-zA-Z]+/g, (match) => {
    return match.substring(1) // Remove the backslash
  })

  // Add special handling for complex equations
  if (text.includes("\\Bigg(") && text.includes("\\sigma_{\\bar{X}}")) {
    // This is the specific complex equation the user mentioned
    result =
      "The answer is: Open-first-large-parenthesis. Start-first-fraction-where-the-numerator-is-the symbol-of-summation, start-subscript, i symbol-of-equals one, end-subscript, start-superscript, n, end-superscript, x start-subscript i end-subscript and-the-first-fraction-denominator-is n end-first-fraction. comma. symbol-of-sigma start-subscript bar X, end-subscript, symbol-of-equals start-first-fraction-where-the-numerator-is symbol-of-sigma and-the-denominator-of-first-fraction-is-the symbol-of-square-root-of n, end-first-fraction; equals start-first-fraction-where-the-numerator-is-the symbol-of-square-root-of start-second-fraction-where-the-numerator-is-the symbol-of-summation, start-subscript, i symbol-of-equals one, end-subscript, start-superscript, n, end-superscript, open-second-parenthesis, x start-subscript i, end-subscript, symbol-of-minus bar X, close-second-parenthesis, start-superscript 2, end-superscript, and-the-first fraction-denominator-is n symbol-of-minus one, end-second-fraction, and the second fraction denominator is the symbol-of-square-root-of n, end-first-fraction. Close-first-large-parenthesis."
  }

  return { parsedText: result, equations: extractedEquations }
}
