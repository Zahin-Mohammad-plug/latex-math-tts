// lib\latex-parser.ts
// Symbol categories for prefix application
export type SymbolCategory = "greek" | "operators" | "comparison" | "sets" | "statistics" | "other"

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
  // Statistics symbols
  "\\mathbb{E}": "statistics",
  "\\mathbb{P}": "statistics",
  "\\mathbb{V}": "statistics",
  "\\mathbb{C}": "statistics",
  "\\mathcal{N}": "statistics",
  "\\mathcal{U}": "statistics",
  "\\mathcal{B}": "statistics",
  "\\mathcal{P}": "statistics",
  "\\mathcal{F}": "statistics",
  "\\mathcal{T}": "statistics",
  "\\mathcal{X}": "statistics",
  "\\chi": "statistics",
}

// Default LaTeX to speech translation mappings
export const defaultLatexMappings: Record<string, string> = {
  // Fractions
  "\\frac": "start fraction where numerator equals",
  // Statistics
  "\\mathbb{E}": "expectation",
  "\\mathbb{P}": "probability",
  "\\mathbb{V}": "variance",
  "\\mathbb{C}": "covariance",
  "\\mathcal{N}": "normal distribution",
  "\\mathcal{U}": "uniform distribution",
  "\\mathcal{B}": "binomial distribution",
  "\\mathcal{P}": "poisson distribution",
  "\\mathcal{F}": "F distribution",
  "\\mathcal{T}": "t distribution",
  "\\mathcal{X}": "chi-squared distribution",
  "\\chi^2": "chi-squared",
  // Distribution notation
  "\\sim": "distributed as",
  "\\mid": "given",
  "\\vert": "given",
  "\\lvert": "given",
  "\\rvert": "end given",
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
      statistics: true,
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
    input.replace(/\\Bigg\$\$.*?\\Bigg\$\$/g, (match) => {
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
        const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : fractionLevel === 3 ? "third" : "fourth"
        return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
      })

      // Process fractions with already processed content (nested fractions)
      processed = processed.replace(
        /\\frac\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}\{(.*?)\}/g,
        (match, numerator, denominator) => {
          fractionLevel++
          const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : fractionLevel === 3 ? "third" : "fourth"
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
        },
      )

      processed = processed.replace(
        /\\frac\{(.*?)\}\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}/g,
        (match, numerator, denominator) => {
          fractionLevel++
          const fractionType = fractionLevel === 1 ? "first" : fractionLevel === 2 ? "second" : fractionLevel === 3 ? "third" : "fourth"
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator}, and-the-${fractionType}-fraction-denominator-is ${denominator}, end-${fractionType}-fraction`
        },
      )
    }

    return processed
  }

  result = processFractions(result)

  // Process nested square roots
  const processSquareRoots = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    let rootLevel = 0

    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed

      // Process innermost square roots first
      processed = processed.replace(/\\sqrt\{([^{}]*)\}/g, (match, content) => {
        rootLevel++
        const rootType = rootLevel === 1 ? "outer" : rootLevel === 2 ? "inner" : rootLevel === 3 ? "innermost" : "deepest"
        return `${rootType}-square-root-of ${content}`
      })

      // Process square roots with already processed content (nested roots)
      processed = processed.replace(
        /\\sqrt\{(.*?square-root-of.*?)\}/g,
        (match, content) => {
          rootLevel++
          const rootType = rootLevel === 1 ? "outer" : rootLevel === 2 ? "inner" : rootLevel === 3 ? "innermost" : "deepest"
          return `${rootType}-square-root-of ${content}`
        }
      )
    }

    return processed
  }

  // Process nth roots with nesting
  const processNthRoots = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    let rootLevel = 0

    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed

      // Process innermost nth roots first
      processed = processed.replace(/\\sqrt\[([^[\]]*)\]\{([^{}]*)\}/g, (match, n, content) => {
        rootLevel++
        const rootType = rootLevel === 1 ? "outer" : rootLevel === 2 ? "inner" : rootLevel === 3 ? "innermost" : "deepest"
        return `${rootType}-${n}th-root-of ${content}`
      })

      // Process nth roots with already processed content
      processed = processed.replace(
        /\\sqrt\[([^[\]]*)\]\{(.*?root-of.*?)\}/g,
        (match, n, content) => {
          rootLevel++
          const rootType = rootLevel === 1 ? "outer" : rootLevel === 2 ? "inner" : rootLevel === 3 ? "innermost" : "deepest"
          return `${rootType}-${n}th-root-of ${content}`
        }
      )
    }

    return processed
  }

  // Apply square root and nth root processing
  result = processSquareRoots(result)
  result = processNthRoots(result)

  // Process nested subscripts
  const processSubscripts = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    
    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed
      
      // Process complex subscripts with braces
      processed = processed.replace(/_\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, content) => {
        // Check if content already contains subscript markers
        if (content.includes("start-subscript")) {
          return ` start-outer-subscript, ${content}, end-outer-subscript`
        } else {
          return ` start-subscript, ${content}, end-subscript`
        }
      })
      
      // Process simple subscripts like x_i
      processed = processed.replace(/_([a-zA-Z0-9])/g, (match, content) => {
        return ` start-subscript ${content} end-subscript`
      })
    }
    
    return processed
  }
  
  // Process nested superscripts
  const processSuperscripts = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    
    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed
      
      // Process complex superscripts with braces
      processed = processed.replace(/\^\{([^{}]*(\{[^{}]*\})*[^{}]*)\}/g, (match, content) => {
        // Check if content already contains superscript markers
        if (content.includes("start-superscript")) {
          return ` start-outer-superscript, ${content}, end-outer-superscript`
        } else {
          return ` start-superscript, ${content}, end-superscript`
        }
      })
      
      // Process simple superscripts like x^2
      processed = processed.replace(/\^([a-zA-Z0-9])/g, (match, content) => {
        return ` start-superscript ${content} end-superscript`
      })
    }
    
    return processed
  }
  
  // Apply subscript and superscript processing
  result = processSubscripts(result)
  result = processSuperscripts(result)

  // Process summation with limits
  result = result.replace(/\\sum_\{([^{}]*)\}\^\{([^{}]*)\}/g, (match, lower, upper) => {
    return `symbol-of-summation, from start-subscript, ${lower}, end-subscript, to start-superscript, ${upper}, end-superscript`
  })
  
  // Process product with limits
  result = result.replace(/\\prod_\{([^{}]*)\}\^\{([^{}]*)\}/g, (match, lower, upper) => {
    return `symbol-of-product, from start-subscript, ${lower}, end-subscript, to start-superscript, ${upper}, end-superscript`
  })
  
  // Process limits
  result = result.replace(/\\lim_\{([^{}]*)\}/g, (match, lower) => {
    return `limit as start-subscript, ${lower}, end-subscript`
  })
  
  // Process integrals with limits
  result = result.replace(/\\int_\{([^{}]*)\}\^\{([^{}]*)\}/g, (match, lower, upper) => {
    return `integral from start-subscript, ${lower}, end-subscript, to start-superscript, ${upper}, end-superscript`
  })

  // Process nested parentheses with levels
  result = result.replace(/\\left\(/g, "Open-outer-parenthesis")
  result = result.replace(/\\right\)/g, "Close-outer-parenthesis")
  result = result.replace(/\\Bigg\(/g, "Open-first-large-parenthesis")
  result = result.replace(/\\Bigg\)/g, "Close-first-large-parenthesis")
  result = result.replace(/\\bigg\(/g, "Open-second-large-parenthesis")
  result = result.replace(/\\bigg\)/g, "Close-second-large-parenthesis")
  result = result.replace(/\\Big\(/g, "Open-third-large-parenthesis")
  result = result.replace(/\\Big\)/g, "Close-third-large-parenthesis")
  result = result.replace(/\\big\(/g, "Open-fourth-large-parenthesis")
  result = result.replace(/\\big\)/g, "Close-fourth-large-parenthesis")

  // Process quad spacing
  result = result.replace(/\\quad/g, " space ")
  result = result.replace(/\\qquad/g, " double-space ")
  
  // Process statistical notation
  result = result.replace(/E\s*\[\s*([^\]]*)\s*\]/g, "expectation of $1")
  result = result.replace(/E\s*\(\s*([^)]*)\s*\)/g, "expectation of $1")
  result = result.replace(/Var\s*\(\s*([^)]*)\s*\)/g, "variance of $1")
  result = result.replace(/Cov\s*\(\s*([^,]*)\s*,\s*([^)]*)\s*\)/g, "covariance of $1 and $2")
  result = result.replace(/P\s*\(\s*([^)]*)\s*\)/g, "probability of $1")
  result = result.replace(/P\s*\(\s*([^|]*)\s*\|\s*([^)]*)\s*\)/g, "probability of $1 given $2")

  // Process decorations like \bar{X}
  result = result.replace(/\\bar\{([^{}]*)\}/g, (match, content) => {
    return `${content} with-straight-top-hat`
  })

  result = result.replace(/\\hat\{([^{}]*)\}/g, (match, content) => {
    return `${content} with-hat`
  })
  
  result = result.replace(/\\tilde\{([^{}]*)\}/g, (match, content) => {
    return `${content} with-tilde`
  })
  
  result = result.replace(/\\vec\{([^{}]*)\}/g, (match, content) => {
    return `${content} vector`
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
  
  // Process distribution notation
  result = result.replace(/([A-Za-z])\s*~\s*([^(]+)\(([^)]+)\)/g, "$1 is distributed as $2 with parameters $3")
  result = result.replace(/([A-Za-z])\s*~\s*([^(]+)/g, "$1 is distributed as $2")

  // Process equals signs
  result = result.replace(/=/g, "symbol-of-equals")
  
  // Process text in math mode
  result = result.replace(/\\text\{([^{}]*)\}/g, "text $1")

  // Fix comma handling to prevent SSML issues
  result = result.replace(/,/g, "comma")

  // Clean up any remaining LaTeX commands (simplified approach)
  result = result.replace(/\\[a-zA-Z]+/g, (match) => {
    return match.substring(1) // Remove the backslash
  })

  // Process cases/piecewise functions
  result = result.replace(/\\begin\{cases\}(.*?)\\end\{cases\}/g, (match, content) => {
    const cases = content.split('\\\\').filter(Boolean);
    let result = "piecewise function where ";
    
    cases.forEach((caseItem: string, index: number) => {
      const parts = caseItem.split('&');
      if (parts.length >= 2) {
        result += `case ${index + 1}: ${parts[0].trim()} when ${parts[1].trim()}`;
        if (index < cases.length - 1) {
          result += ", and ";
        }
      }
    });
    
    return result;
  });
  
  // Handle conditional probability better
  result = result.replace(/\|/g, " given ");

  return { parsedText: result, equations: extractedEquations }
}
