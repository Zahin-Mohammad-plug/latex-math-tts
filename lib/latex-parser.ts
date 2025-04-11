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
  "\\chi2": "statistics",
}

// Default LaTeX to speech translation mappings
export const defaultLatexMappings: Record<string, string> = {
  // Fractions
  "\\frac": "start fraction where numerator equals",
  "\\tfrac": "start fraction where numerator equals",
  // Statistics
  "\\mathbb{E}": "capital-E",
  "\\mathbb{P}": "capital-P",
  "\\mathbb{V}": "capital-V",
  "\\mathbb{C}": "capital-C",
  "\\mathcal{N}": "capital-N",
  "\\mathcal{U}": "capital-U",
  "\\mathcal{B}": "capital-B",
  "\\mathcal{P}": "capital-P",
  "\\mathcal{F}": "capital-F",
  "\\mathcal{T}": "capital-T",
  "\\mathcal{X}": "capital-X",
  "\\chi^2": "chi-squared",
  // Distribution notation
  "\\sim": "distributed-as",
  "\\approx": "approx-equal-to",
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
  "\\chi": "chi lowercase",
  "\\psi": "psi lowercase",
  "\\omega": "omega lowercase",
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
  // Note: Some symbols are already defined in the Greek letters section
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
  N: "Capital-N",
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
  
  // Process text to announce letter case for single letters
  const processLetterCase = (input: string): string => {
    let processed = input;
    
    // Process letters within math delimiters \( and \)
    processed = processed.replace(/\\(\(|\[)(.*?)\\(\)|\])/g, (match, openDelim, content, closeDelim) => {
      // Replace single uppercase letters with "Capital X"
      let processedContent = content.replace(/\b([A-Z])\b/g, "Capital $1");
      
      // Don't modify letters that are already marked as capital
      processedContent = processedContent.replace(/Capital Capital/g, "Capital");
      
      return `\\${openDelim}${processedContent}\\${closeDelim}`;
    });
    
    // Process letters within $ delimiters
    processed = processed.replace(/\$(.*?)\$/g, (match, content) => {
      // Replace single uppercase letters with "Capital X"
      let processedContent = content.replace(/\b([A-Z])\b/g, "Capital $1");
      
      // Don't modify letters that are already marked as capital
      processedContent = processedContent.replace(/Capital Capital/g, "Capital");
      
      return `$${processedContent}$`;
    });
    
    // Process letters within $$ delimiters
    processed = processed.replace(/\$\$(.*?)\$\$/g, (match, content) => {
      // Replace single uppercase letters with "Capital X"
      let processedContent = content.replace(/\b([A-Z])\b/g, "Capital $1");
      
      // Don't modify letters that are already marked as capital
      processedContent = processedContent.replace(/Capital Capital/g, "Capital");
      
      return `$$${processedContent}$$`;
    });
    
    return processed;
  };
  
  // Apply letter case processing
  result = processLetterCase(result);
  
  // Process nested fractions with multiple levels
  const processFractions = (input: string): string => {
    let processed = input
    let lastProcessed = ""
    
    // Keep processing until no more changes are made
    while (processed !== lastProcessed) {
      lastProcessed = processed
      
      // Track nesting depth for each fraction
      // Process innermost fractions first (those without nested fractions inside them)
      processed = processed.replace(/\\(frac|tfrac)\{([^{}]*)\}\{([^{}]*)\}/g, (match, command, numerator, denominator) => {
        // Determine nesting level by counting existing fraction markers in the context
        const contextBefore = processed.substring(0, processed.indexOf(match));
        const nestingLevel = (contextBefore.match(/start-.*?-fraction/g) || []).length;
        
        // Determine fraction type based on nesting level
        const fractionType = nestingLevel === 0 ? "first" : nestingLevel === 1 ? "second" : nestingLevel === 2 ? "third" : "fourth";
        
        return `start-${fractionType}-fraction-where-the-numerator-is ${numerator} and-the-${fractionType}-fraction-denominator-is ${denominator} end-${fractionType}-fraction`;
      });

      // Process fractions with already processed content in numerator (nested fractions)
      processed = processed.replace(
        /\\(frac|tfrac)\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}\{(.*?)\}/g,
        (match, command, numerator, denominator) => {
          // Determine nesting level by counting existing fraction markers in the context
          const contextBefore = processed.substring(0, processed.indexOf(match));
          const nestingLevel = (contextBefore.match(/start-.*?-fraction/g) || []).length;
          
          // Determine fraction type based on nesting level
          const fractionType = nestingLevel === 0 ? "first" : nestingLevel === 1 ? "second" : nestingLevel === 2 ? "third" : "fourth";
          
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator} and-the-${fractionType}-fraction-denominator-is ${denominator} end-${fractionType}-fraction`;
        },
      );

      // Process fractions with already processed content in denominator (nested fractions)
      processed = processed.replace(
        /\\(frac|tfrac)\{(.*?)\}\{(.*?start-.*?fraction.*?end-.*?fraction.*?)\}/g,
        (match, command, numerator, denominator) => {
          // Determine nesting level by counting existing fraction markers in the context
          const contextBefore = processed.substring(0, processed.indexOf(match));
          const nestingLevel = (contextBefore.match(/start-.*?-fraction/g) || []).length;
          
          // Determine fraction type based on nesting level
          const fractionType = nestingLevel === 0 ? "first" : nestingLevel === 1 ? "second" : nestingLevel === 2 ? "third" : "fourth";
          
          return `start-${fractionType}-fraction-where-the-numerator-is ${numerator} and-the-${fractionType}-fraction-denominator-is ${denominator} end-${fractionType}-fraction`;
        },
      );
    }

    return processed;
  };

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

  // Process nested parentheses with dynamic level tracking
  const processParentheses = (input: string): string => {
    let processed = input;
    
    // Process \left( and \right) pairs with nesting level tracking
    const leftParenPattern = /\\left\(/g;
    const rightParenPattern = /\\right\)/g;
    
    // First, mark all left parentheses with placeholders
    let leftParenMatches: { index: number, length: number }[] = [];
    let match;
    while ((match = leftParenPattern.exec(processed)) !== null) {
      leftParenMatches.push({ index: match.index, length: match[0].length });
    }
    
    // Then mark all right parentheses with placeholders
    let rightParenMatches: { index: number, length: number }[] = [];
    while ((match = rightParenPattern.exec(processed)) !== null) {
      rightParenMatches.push({ index: match.index, length: match[0].length });
    }
    
    // Sort matches by index in reverse order to avoid changing indices when replacing
    leftParenMatches.sort((a, b) => b.index - a.index);
    rightParenMatches.sort((a, b) => b.index - a.index);
    
    // Replace with level-aware markers
    // Create a stack to track nesting levels
    let stack: number[] = [];
    let levels: Record<number, number> = {}; // Maps right paren index to its nesting level
    
    // Process left parentheses from left to right to build the stack
    leftParenMatches.sort((a, b) => a.index - b.index);
    for (const leftParen of leftParenMatches) {
      stack.push(leftParen.index);
    }
    
    // Process right parentheses from left to right and pair with left parentheses
    rightParenMatches.sort((a, b) => a.index - b.index);
    for (const rightParen of rightParenMatches) {
      if (stack.length > 0) {
        const leftParenIndex = stack.pop()!;
        const nestingLevel = stack.length; // Remaining stack size is the nesting level
        levels[rightParen.index] = nestingLevel;
      }
    }
    
    // Reset stack for left parentheses processing
    stack = [];
    
    // Now replace right parentheses first (in reverse order)
    rightParenMatches.sort((a, b) => b.index - a.index);
    for (const rightParen of rightParenMatches) {
      const level = levels[rightParen.index] || 0;
      const levelName = level === 0 ? "outer" : level === 1 ? "inner" : level === 2 ? "innermost" : "deepest";
      processed = processed.substring(0, rightParen.index) + 
                 `Close-${levelName}-parenthesis` + 
                 processed.substring(rightParen.index + rightParen.length);
    }
    
    // Then replace left parentheses (in reverse order)
    leftParenMatches.sort((a, b) => b.index - a.index);
    for (const leftParen of leftParenMatches) {
      stack.push(leftParen.index);
      const level = stack.length - 1;
      const levelName = level === 0 ? "outer" : level === 1 ? "inner" : level === 2 ? "innermost" : "deepest";
      processed = processed.substring(0, leftParen.index) + 
                 `Open-${levelName}-parenthesis` + 
                 processed.substring(leftParen.index + leftParen.length);
    }
    
    // Process other parenthesis styles with appropriate nesting levels
    processed = processed.replace(/\\Bigg\(/g, "Open-first-large-parenthesis");
    processed = processed.replace(/\\Bigg\)/g, "Close-first-large-parenthesis");
    processed = processed.replace(/\\bigg\(/g, "Open-second-large-parenthesis");
    processed = processed.replace(/\\bigg\)/g, "Close-second-large-parenthesis");
    processed = processed.replace(/\\Big\(/g, "Open-third-large-parenthesis");
    processed = processed.replace(/\\Big\)/g, "Close-third-large-parenthesis");
    processed = processed.replace(/\\big\(/g, "Open-fourth-large-parenthesis");
    processed = processed.replace(/\\big\)/g, "Close-fourth-large-parenthesis");
    
    return processed;
  };
  
  // Apply parentheses processing
  result = processParentheses(result);

  // Process quad spacing
  result = result.replace(/\\quad/g, " space ")
  result = result.replace(/\\qquad/g, " double-space ")
  
  // Process statistical notation
  // result = result.replace(/E\s*\[\s*([^\]]*)\s*\]/g, "expectation of $1")
  // result = result.replace(/E\s*\(\s*([^)]*)\s*\)/g, "expectation of $1")
  // result = result.replace(/Var\s*\(\s*([^)]*)\s*\)/g, "variance of $1")
  // result = result.replace(/Cov\s*\(\s*([^,]*)\s*,\s*([^)]*)\s*\)/g, "covariance of $1 and $2")
  // result = result.replace(/P\s*\(\s*([^)]*)\s*\)/g, "probability of $1")
  // result = result.replace(/P\s*\(\s*([^|]*)\s*\|\s*([^)]*)\s*\)/g, "probability of $1 given $2")

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
  
  // Remove backslashes before LaTeX delimiters so they're not read out loud
  result = result.replace(/\\(\[|\]|\(|\))/g, "$1")
  
  // Process distribution notation
  result = result.replace(/([A-Za-z])\s*~\s*([^(]+)\(([^)]+)\)/g, (match, left, dist, params) => {
    // Apply mappings to distribution symbols if they exist
    const trimmedDist = dist.trim();
    // Check for single capital letters that might have mappings
    if (trimmedDist.length === 1 && /[A-Z]/.test(trimmedDist) && customMappings[trimmedDist]) {
      return `${left} is distributed as ${customMappings[trimmedDist]} with parameters ${params}`;
    }
    return `${left} is distributed as ${dist} with parameters ${params}`;
  });
  
  result = result.replace(/([A-Za-z])\s*~\s*([^(]+)/g, (match, left, dist) => {
    // Apply mappings to distribution symbols if they exist
    const trimmedDist = dist.trim();
    // Check for single capital letters that might have mappings
    if (trimmedDist.length === 1 && /[A-Z]/.test(trimmedDist) && customMappings[trimmedDist]) {
      return `${left} is distributed as ${customMappings[trimmedDist]}`;
    }
    return `${left} is distributed as ${dist}`;
  });

  // Process equals signs
  result = result.replace(/=/g, " equals ")
  
  // Handle minus signs in mathematical contexts
  // Replace minus signs in front of numbers (negative numbers)
  result = result.replace(/-(\d+)/g, "negative $1")
  // // Replace minus signs between terms (subtraction)
  // result = result.replace(/(\w|\)|\})\s*-\s*(\w|\(|\{)/g, "$1 minus $2")
  result = result.replace(/\s - /g, " dash ")
  // Replace dash in other contexts (keep as dash)
  result = result.replace(/\s-\s/g, " dash ")
  
  // Handle decimal points in numbers with more explicit language
  result = result.replace(/(\d+)\.(\d+)/g, "$1 point $2")
  
  // Handle periods at the end of sentences or standalone
  // First mark periods that are not part of decimal points
  result = result.replace(/([^0-9])\.([^0-9]|$)/g, "$1 period $2")
  
  // Process text in math mode
  result = result.replace(/\\text\{([^{}]*)\}/g, "text $1")
  
  // Clean up any double spaces that might have been introduced
  result = result.replace(/\s{2,}/g, " ")

  // Fix comma handling to prevent SSML issues and add spaces
  result = result.replace(/,/g, " comma ")

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
