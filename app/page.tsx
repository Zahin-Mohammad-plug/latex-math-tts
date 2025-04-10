// app\page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RefreshCw,
  Volume2,
  Settings,
  Check,
  X,
  Edit2,
  Eye,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { parseLatex, defaultLatexMappings, type SymbolCategory } from "@/lib/latex-parser"
import { EquationDisplay } from "@/components/equation-display"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MathTTS() {
  const [input, setInput] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [rate, setRate] = useState(1)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [sentences, setSentences] = useState<string[]>([])
  const [parsedText, setParsedText] = useState("")
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [showPreview, setShowPreview] = useState(true)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [words, setWords] = useState<string[]>([])
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")

  // Settings state
  const [latexMappings, setLatexMappings] = useState<Record<string, string>>(defaultLatexMappings)
  const [newCommand, setNewCommand] = useState("")
  const [newReplacement, setNewReplacement] = useState("")

  // Editing state
  const [editingCommand, setEditingCommand] = useState<string | null>(null)
  const [editedReplacement, setEditedReplacement] = useState("")

  // Symbol prefix settings
  const [useSymbolPrefix, setUseSymbolPrefix] = useState(true)
  const [symbolPrefix, setSymbolPrefix] = useState("symbol of")

  // Symbol categories to apply prefix to
  const [prefixCategories, setPrefixCategories] = useState<Record<SymbolCategory, boolean>>({
    greek: true,
    operators: true,
    comparison: true,
    sets: true,
    statistics: true,
    other: false,
  })

  // Pause settings
  const [pauseSettings, setPauseSettings] = useState({
    period: 1000, // ms
    newline: 800, // ms
    space: 200, // ms in equations
    generalSpace: 50, // ms for general spaces
    comma: 500, // ms
    symbolGroup: 10, // ms for grouped symbols (much faster)
  })

  // Symbol grouping settings
  const [groupSymbols, setGroupSymbols] = useState(true)

  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null
  const speechPreviewRef = useRef<HTMLDivElement>(null)

  // Load available voices
  useEffect(() => {
    if (!speechSynthesis) return

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      setAvailableVoices(voices)

      // Set default voice if available
      if (voices.length > 0 && !selectedVoice) {
        setSelectedVoice(voices[0].name)
      }
    }

    loadVoices()

    // Chrome loads voices asynchronously
    speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      if (speechSynthesis) {
        speechSynthesis.onvoiceschanged = null
      }
    }
  }, [speechSynthesis, selectedVoice])

  // Split text into sentences and parse LaTeX when input changes
  useEffect(() => {
    if (input) {
      const parsedResult = parseLatex(input, latexMappings, {
        useSymbolPrefix,
        symbolPrefix,
        prefixCategories,
        groupSymbols,
      })

      setParsedText(parsedResult.parsedText)

      // Split by sentence endings or equation separations
      const sentenceArray = parsedResult.parsedText
        .replace(/([.!?])\s*/g, "$1|")
        .split("|")
        .filter((sentence) => sentence.trim().length > 0)

      setSentences(sentenceArray)

      // Split into words for highlighting
      const allWords = parsedResult.parsedText.split(/\s+/)
      setWords(allWords)
    } else {
      setParsedText("")
      setSentences([])
      setWords([])
    }
  }, [input, latexMappings, useSymbolPrefix, symbolPrefix, prefixCategories, groupSymbols])

// This is the corrected speak function to fix the "Break, Time equals 500 ms" issue
// Replace the current speak function in page.tsx with this version

// Handle speech synthesis with custom pauses
const speak = (text: string, index: number) => {
  if (!speechSynthesis) return

  speechSynthesis.cancel() // Cancel any ongoing speech
  setCurrentWordIndex(-1)

  // Split text into words for highlighting
  const textWords = text.split(/\s+/)
  let currentWordIdx = 0

  // We will NOT add SSML-like tags directly to the text
  // Instead, we'll split the text into segments and use setTimeout for pauses
  
  // Split text by punctuation that we want to add pauses after
  const segments: { text: string; pauseAfter: number }[] = []
  
  // Helper to add segment and pause
  const addSegment = (segmentText: string, pauseDuration: number) => {
    if (segmentText.trim()) {
      segments.push({ text: segmentText.trim(), pauseAfter: pauseDuration });
    }
  }
  
  // Process the text character by character to create segments
  let currentSegment = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentSegment += char;
    
    // Check for pause points
    if (char === '.' && (i === text.length - 1 || text[i+1] === ' ')) {
      // End of sentence - period followed by space or end of text
      addSegment(currentSegment, pauseSettings.period);
      currentSegment = "";
    } else if (char === ',' && (i === text.length - 1 || text[i+1] === ' ')) {
      // Comma followed by space
      addSegment(currentSegment, pauseSettings.comma);
      currentSegment = "";
    } else if (char === '\n') {
      // Newline
      addSegment(currentSegment, pauseSettings.newline);
      currentSegment = "";
    } else if (char === ' ') {
      // Space (apply different pause based on context)
      // For simplicity, we'll use generalSpace for all spaces here
      addSegment(currentSegment, pauseSettings.generalSpace);
      currentSegment = "";
    } else if (char === '-' && text.substring(i-7, i) === "symbol-") {
      // Symbol group marker
      addSegment(currentSegment, pauseSettings.symbolGroup);
      currentSegment = "";
    }
  }
  
  // Add any remaining text
  if (currentSegment.trim()) {
    addSegment(currentSegment, 0);
  }

  // Function to speak segments in sequence
  const speakSegment = (segmentIndex: number) => {
    if (segmentIndex >= segments.length) {
      if (index < sentences.length - 1) {
        speak(sentences[index + 1], index + 1)
      } else {
        setIsPlaying(false)
        setCurrentUtterance(null)
        setCurrentWordIndex(-1)
      }
      return
    }

    const { text: segmentText, pauseAfter } = segments[segmentIndex];

    // Skip empty segments
    if (!segmentText.trim()) {
      speakSegment(segmentIndex + 1)
      return
    }

    const utterance = new SpeechSynthesisUtterance(segmentText)
    utterance.rate = rate

    // Set selected voice if available
    if (selectedVoice) {
      const voice = availableVoices.find((v) => v.name === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    // Word boundary event for highlighting
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const wordPosition = event.charIndex
        const word = segmentText.substring(wordPosition).split(/\s+/)[0]

        // Calculate global word index
        const globalWordIdx = sentences.slice(0, index).join(" ").split(/\s+/).length + currentWordIdx
        setCurrentWordIndex(globalWordIdx)
        currentWordIdx++

        // Scroll to the current word
        if (speechPreviewRef.current) {
          const wordElements = speechPreviewRef.current.querySelectorAll(".word")
          if (wordElements[globalWordIdx]) {
            wordElements[globalWordIdx].scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        }
      }
    }

    utterance.onend = () => {
      // After this segment finishes, wait for the pause duration then speak the next segment
      if (pauseAfter > 0) {
        setTimeout(() => speakSegment(segmentIndex + 1), pauseAfter);
      } else {
        speakSegment(segmentIndex + 1);
      }
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
      setCurrentWordIndex(-1)
    }

    speechSynthesis.speak(utterance)
    setCurrentUtterance(utterance)
  }

  speakSegment(0)
  setCurrentSentence(index)
  setIsPlaying(true)
}
  // Play control
  const startPlayback = () => {
    if (sentences.length === 0) return

    if (speechSynthesis?.paused) {
      speechSynthesis.resume()
      setIsPlaying(true)
    } else {
      speak(sentences[currentSentence], currentSentence)
    }
  }

  // Pause control
  const pausePlayback = () => {
    if (speechSynthesis && isPlaying) {
      speechSynthesis.pause()
      setIsPlaying(false)
    }
  }

  // Go to previous sentence
  const previousSentence = () => {
    if (!speechSynthesis || currentSentence <= 0) return

    speechSynthesis.cancel()
    const newIndex = Math.max(0, currentSentence - 1)
    setCurrentSentence(newIndex)
    speak(sentences[newIndex], newIndex)
  }

  // Go to next sentence
  const nextSentence = () => {
    if (!speechSynthesis || currentSentence >= sentences.length - 1) return

    speechSynthesis.cancel()
    const newIndex = Math.min(sentences.length - 1, currentSentence + 1)
    setCurrentSentence(newIndex)
    speak(sentences[newIndex], newIndex)
  }

  // Restart current sentence
  const restartSentence = () => {
    if (!speechSynthesis) return

    speechSynthesis.cancel()
    speak(sentences[currentSentence], currentSentence)
  }

  // Restart from beginning
  const restartFromBeginning = () => {
    if (!speechSynthesis || sentences.length === 0) return

    speechSynthesis.cancel()
    setCurrentSentence(0)
    speak(sentences[0], 0)
  }

  // Update speech rate
  const handleRateChange = (value: number[]) => {
    const newRate = value[0]
    setRate(newRate)

    if (currentUtterance && isPlaying) {
      // Update the rate of the current utterance
      speechSynthesis?.cancel()
      speak(sentences[currentSentence], currentSentence)
    }
  }

  // Add new LaTeX mapping
  const addMapping = () => {
    if (newCommand.trim() && newReplacement.trim()) {
      setLatexMappings({
        ...latexMappings,
        [newCommand]: newReplacement,
      })
      setNewCommand("")
      setNewReplacement("")
    }
  }

  // Start editing a mapping
  const startEditing = (command: string) => {
    setEditingCommand(command)
    setEditedReplacement(latexMappings[command])
  }

  // Save edited mapping
  const saveEditing = () => {
    if (editingCommand && editedReplacement.trim()) {
      const updatedMappings = { ...latexMappings }
      updatedMappings[editingCommand] = editedReplacement
      setLatexMappings(updatedMappings)
      setEditingCommand(null)
    }
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingCommand(null)
  }

  // Remove LaTeX mapping
  const removeMapping = (command: string) => {
    const updatedMappings = { ...latexMappings }
    delete updatedMappings[command]
    setLatexMappings(updatedMappings)
  }

  // Update pause setting
  const updatePauseSetting = (setting: keyof typeof pauseSettings, value: number[]) => {
    setPauseSettings({
      ...pauseSettings,
      [setting]: value[0],
    })
  }

  // Toggle prefix category
  const togglePrefixCategory = (category: SymbolCategory) => {
    setPrefixCategories({
      ...prefixCategories,
      [category]: !prefixCategories[category],
    })
  }

  // Toggle equation preview
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  // Handle voice change
  const handleVoiceChange = (value: string) => {
    setSelectedVoice(value)
  }

  // Render words with highlighting for current word
  const renderWords = () => {
    return words.map((word, index) => (
      <span key={index} className={`word ${index === currentWordIndex ? "bg-primary/20 rounded px-1" : ""}`}>
        {word}{" "}
      </span>
    ))
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Math TTS</CardTitle>
            <CardDescription>Convert text and LaTeX math expressions into spoken audio</CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={togglePreview}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle preview</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>Customize LaTeX mappings and pause durations</SheetDescription>
                </SheetHeader>

                <Tabs defaultValue="mappings" className="mt-6">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="mappings" className="text-xs sm:text-sm">
                      Mappings
                    </TabsTrigger>
                    <TabsTrigger value="symbols" className="text-xs sm:text-sm">
                      Symbols
                    </TabsTrigger>
                    <TabsTrigger value="pauses" className="text-xs sm:text-sm">
                      Pauses
                    </TabsTrigger>
                    <TabsTrigger value="grouping" className="text-xs sm:text-sm">
                      Grouping
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="text-xs sm:text-sm">
                      Voice
                    </TabsTrigger>
                    <TabsTrigger value="config" className="text-xs sm:text-sm">
                      Config
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="mappings" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                        <Input
                          placeholder="LaTeX Command"
                          value={newCommand}
                          onChange={(e) => setNewCommand(e.target.value)}
                        />
                        <Input
                          placeholder="Spoken Text"
                          value={newReplacement}
                          onChange={(e) => setNewReplacement(e.target.value)}
                        />
                        <Button onClick={addMapping}>Add</Button>
                      </div>

                      <div className="border rounded-md">
                        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 p-2 font-medium bg-muted">
                          <div>LaTeX Command</div>
                          <div>Spoken Text</div>
                          <div></div>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {Object.entries(latexMappings).map(([command, replacement]) => (
                            <div key={command} className="grid grid-cols-[1fr_1fr_auto] gap-2 p-2 border-t">
                              {editingCommand === command ? (
                                <>
                                  <div className="font-mono text-sm">{command}</div>
                                  <Input
                                    value={editedReplacement}
                                    onChange={(e) => setEditedReplacement(e.target.value)}
                                    className="h-8"
                                  />
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={saveEditing} className="h-8 w-8">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={cancelEditing} className="h-8 w-8">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="font-mono text-sm">{command}</div>
                                  <div>{replacement}</div>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => startEditing(command)}
                                      className="h-8 w-8"
                                    >
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeMapping(command)}
                                      className="h-8 w-8"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="symbols" className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="use-symbol-prefix">Use symbol prefix</Label>
                        <Switch id="use-symbol-prefix" checked={useSymbolPrefix} onCheckedChange={setUseSymbolPrefix} />
                      </div>

                      {useSymbolPrefix && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="symbol-prefix">Symbol prefix text</Label>
                            <Input
                              id="symbol-prefix"
                              value={symbolPrefix}
                              onChange={(e) => setSymbolPrefix(e.target.value)}
                              placeholder="e.g., symbol of"
                            />
                            <p className="text-sm text-muted-foreground">
                              This text will be added before symbols in the selected categories
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label>Apply prefix to these categories:</Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-greek" className="cursor-pointer">
                                  Greek letters (α, β, γ)
                                </Label>
                                <Switch
                                  id="prefix-greek"
                                  checked={prefixCategories.greek}
                                  onCheckedChange={() => togglePrefixCategory("greek")}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-operators" className="cursor-pointer">
                                  Operators (×, ÷, ±)
                                </Label>
                                <Switch
                                  id="prefix-operators"
                                  checked={prefixCategories.operators}
                                  onCheckedChange={() => togglePrefixCategory("operators")}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-comparison" className="cursor-pointer">
                                  Comparison (≤, ≥, ≈)
                                </Label>
                                <Switch
                                  id="prefix-comparison"
                                  checked={prefixCategories.comparison}
                                  onCheckedChange={() => togglePrefixCategory("comparison")}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-sets" className="cursor-pointer">
                                  Sets (∈, ∩, ∪)
                                </Label>
                                <Switch
                                  id="prefix-sets"
                                  checked={prefixCategories.sets}
                                  onCheckedChange={() => togglePrefixCategory("sets")}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-statistics" className="cursor-pointer">
                                  Statistics (E, P, Var)
                                </Label>
                                <Switch
                                  id="prefix-statistics"
                                  checked={prefixCategories.statistics}
                                  onCheckedChange={() => togglePrefixCategory("statistics")}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="prefix-other" className="cursor-pointer">
                                  Other symbols
                                </Label>
                                <Switch
                                  id="prefix-other"
                                  checked={prefixCategories.other}
                                  onCheckedChange={() => togglePrefixCategory("other")}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="pauses" className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Period Pause: {pauseSettings.period}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.period]}
                          min={0}
                          max={2000}
                          step={50}
                          onValueChange={(value) => updatePauseSetting("period", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>New Line Pause: {pauseSettings.newline}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.newline]}
                          min={0}
                          max={2000}
                          step={50}
                          onValueChange={(value) => updatePauseSetting("newline", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Comma Pause: {pauseSettings.comma}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.comma]}
                          min={0}
                          max={1000}
                          step={50}
                          onValueChange={(value) => updatePauseSetting("comma", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Space Pause (in equations): {pauseSettings.space}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.space]}
                          min={0}
                          max={500}
                          step={10}
                          onValueChange={(value) => updatePauseSetting("space", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>General Space Pause: {pauseSettings.generalSpace}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.generalSpace]}
                          min={0}
                          max={300}
                          step={10}
                          onValueChange={(value) => updatePauseSetting("generalSpace", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Symbol Group Pause: {pauseSettings.symbolGroup}ms</Label>
                        </div>
                        <Slider
                          value={[pauseSettings.symbolGroup]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updatePauseSetting("symbolGroup", value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Shorter pause between grouped symbols like "symbol-of-alpha"
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="grouping" className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="group-symbols">Group related symbols</Label>
                        <Switch id="group-symbols" checked={groupSymbols} onCheckedChange={setGroupSymbols} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        When enabled, related symbols like "symbol of normal distribution" will be grouped together with
                        shorter pauses between words
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="voice" className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="voice-select">Select Voice</Label>
                        <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                          <SelectTrigger id="voice-select">
                            <SelectValue placeholder="Select a voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableVoices.map((voice) => (
                              <SelectItem key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">Choose a voice for speech synthesis</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="config" className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Configuration Management</h3>
                        <p className="text-sm text-muted-foreground">
                          Export your current settings to a file or import settings from a previously exported file.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          onClick={() => {
                            // Create configuration object
                            const config = {
                              latexMappings,
                              symbolSettings: {
                                useSymbolPrefix,
                                symbolPrefix,
                                prefixCategories,
                                groupSymbols,
                              },
                              pauseSettings,
                              selectedVoice,
                            }

                            // Convert to JSON string
                            const configJson = JSON.stringify(config, null, 2)

                            // Create blob and download link
                            const blob = new Blob([configJson], { type: "application/json" })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement("a")
                            a.href = url
                            a.download = "math-tts-config.json"
                            document.body.appendChild(a)
                            a.click()
                            document.body.removeChild(a)
                            URL.revokeObjectURL(url)
                          }}
                        >
                          Export Settings
                        </Button>

                        <div className="flex-1">
                          <Label htmlFor="import-config" className="block mb-2">
                            Import Settings
                          </Label>
                          <Input
                            id="import-config"
                            type="file"
                            accept=".json"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (!file) return

                              const reader = new FileReader()
                              reader.onload = (event) => {
                                try {
                                  const config = JSON.parse(event.target?.result as string)
                                  
                                  // Apply imported settings
                                  if (config.latexMappings) {
                                    setLatexMappings(config.latexMappings)
                                  }
                                  
                                  if (config.symbolSettings) {
                                    if (config.symbolSettings.useSymbolPrefix !== undefined) {
                                      setUseSymbolPrefix(config.symbolSettings.useSymbolPrefix)
                                    }
                                    if (config.symbolSettings.symbolPrefix) {
                                      setSymbolPrefix(config.symbolSettings.symbolPrefix)
                                    }
                                    if (config.symbolSettings.prefixCategories) {
                                      setPrefixCategories(config.symbolSettings.prefixCategories)
                                    }
                                    if (config.symbolSettings.groupSymbols !== undefined) {
                                      setGroupSymbols(config.symbolSettings.groupSymbols)
                                    }
                                  }
                                  
                                  if (config.pauseSettings) {
                                    setPauseSettings(config.pauseSettings)
                                  }
                                  
                                  if (config.selectedVoice) {
                                    // Only set the voice if it exists in available voices
                                    const voiceExists = availableVoices.some(
                                      (voice) => voice.name === config.selectedVoice
                                    )
                                    if (voiceExists) {
                                      setSelectedVoice(config.selectedVoice)
                                    }
                                  }
                                  
                                  alert("Settings imported successfully!")
                                } catch (error) {
                                  console.error("Error importing settings:", error)
                                  alert("Error importing settings. Please check the file format.")
                                }
                              }
                              reader.readAsText(file)
                            }}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Select a previously exported configuration file (.json)
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="latex-input" className="block text-sm font-medium mb-2">
              Enter text with LaTeX math expressions:
            </label>
            <Textarea
              id="latex-input"
              placeholder="Enter text or paste LaTeX math expressions here..."
              className="min-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {showPreview && input && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-sm font-medium mb-2">Equation Preview:</h3>
                <EquationDisplay latex={input} />
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-sm font-medium mb-2">Speech Preview:</h3>
                <div ref={speechPreviewRef} className="text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                  {renderWords()}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Playback Speed: {rate.toFixed(1)}x</span>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={[rate]}
                  min={0.1}
                  max={3}
                  step={0.1}
                  onValueChange={handleRateChange}
                  className="w-[200px]"
                />
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={restartFromBeginning} disabled={!sentences.length}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Restart from beginning</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={previousSentence}
                      disabled={!sentences.length || currentSentence === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Previous sentence</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button onClick={startPlayback} disabled={!sentences.length || isPlaying}>
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <Button onClick={pausePlayback} disabled={!sentences.length || !isPlaying} variant="secondary">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSentence}
                      disabled={!sentences.length || currentSentence === sentences.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next sentence</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={restartSentence} disabled={!sentences.length}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Restart current sentence</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {sentences.length > 0 && (
              <span>
                Sentence {currentSentence + 1} of {sentences.length}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
