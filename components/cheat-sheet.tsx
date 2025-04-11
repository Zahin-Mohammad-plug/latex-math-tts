"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { defaultLatexMappings } from "@/lib/latex-parser"
import { EquationDisplay } from "@/components/equation-display"

interface CheatSheetProps {
  latexMappings: Record<string, string>
  onClose?: () => void
}

interface SymbolPair {
  command: string
  spoken: string
}

export function CheatSheet({ latexMappings = defaultLatexMappings, onClose }: CheatSheetProps) {
  const [inputText, setInputText] = useState<string>("")
  const [symbolPairs, setSymbolPairs] = useState<SymbolPair[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // Function to extract LaTeX commands from text
  const extractCommands = (text: string): string[] => {
    if (!text) return []
    
    // Regular expression to match LaTeX commands
    const commandRegex = /\\[a-zA-Z]+(\{[^{}]*\})?/g
    const matches = text.match(commandRegex) || []
    
    // Filter out duplicates
    return [...new Set(matches)]
  }

  // Generate cheat sheet from input text
  const generateCheatSheet = () => {
    setIsGenerating(true)
    
    try {
      // Extract commands from input text
      const commands = extractCommands(inputText)
      
      // Create symbol pairs
      const pairs: SymbolPair[] = commands
        .filter(cmd => latexMappings[cmd]) // Only include commands that have a mapping
        .map(cmd => ({
          command: cmd,
          spoken: latexMappings[cmd]
        }))
        .sort((a, b) => a.command.localeCompare(b.command)) // Sort alphabetically
      
      setSymbolPairs(pairs)
    } catch (error) {
      console.error("Error generating cheat sheet:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate a complete cheat sheet with all available mappings
  const generateCompleteCheatSheet = () => {
    setIsGenerating(true)
    
    try {
      // Create symbol pairs for all mappings
      const pairs: SymbolPair[] = Object.entries(latexMappings)
        .map(([cmd, spoken]) => ({
          command: cmd,
          spoken: spoken
        }))
        .sort((a, b) => a.command.localeCompare(b.command)) // Sort alphabetically
      
      setSymbolPairs(pairs)
    } catch (error) {
      console.error("Error generating complete cheat sheet:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Filter symbol pairs based on search term
  const filteredSymbolPairs = symbolPairs.filter(pair => 
    pair.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pair.spoken.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Symbol Cheat Sheet</CardTitle>
        <CardDescription>
          Generate a reference sheet showing LaTeX symbols and their spoken equivalents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Input Text (Optional)</Label>
          <Textarea
            id="input-text"
            placeholder="Paste LaTeX text here to extract symbols..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Paste LaTeX text to generate a cheat sheet specific to the symbols used in that text,
            or click "Generate Complete Cheat Sheet" to see all available symbols.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={generateCheatSheet} disabled={isGenerating || !inputText}>
            Generate from Text
          </Button>
          <Button onClick={generateCompleteCheatSheet} disabled={isGenerating} variant="outline">
            Generate Complete Cheat Sheet
          </Button>
          {onClose && (
            <Button onClick={onClose} variant="ghost" className="ml-auto">
              Close
            </Button>
          )}
        </div>
        
        {symbolPairs.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center">
              <Label htmlFor="search" className="mr-2">Search:</Label>
              <Input
                id="search"
                placeholder="Filter symbols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            <ScrollArea className="h-[400px] border rounded-md">
              <div className="grid grid-cols-[auto_1fr_2fr] gap-2 p-2 font-medium bg-muted">
                <div className="px-4 py-2">Symbol</div>
                <div className="px-4 py-2">LaTeX Command</div>
                <div className="px-4 py-2">Spoken As</div>
              </div>
              <div>
                {filteredSymbolPairs.map((pair, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-[auto_1fr_2fr] gap-2 p-2 border-t hover:bg-muted/50"
                  >
                    <div className="px-4 py-2 text-center">
                      <EquationDisplay latex={`$${pair.command}$`} />
                    </div>
                    <div className="px-4 py-2 font-mono">{pair.command}</div>
                    <div className="px-4 py-2">{pair.spoken}</div>
                  </div>
                ))}
                {filteredSymbolPairs.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No symbols found matching your search.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {symbolPairs.length > 0 && (
            <span>
              Showing {filteredSymbolPairs.length} of {symbolPairs.length} symbols
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
