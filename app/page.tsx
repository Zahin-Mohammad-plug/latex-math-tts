"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipBack, RefreshCw, Volume2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { parseLatex, defaultLatexMappings } from "@/lib/latex-parser"

export default function MathTTS() {
  const [input, setInput] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [rate, setRate] = useState(1)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [sentences, setSentences] = useState<string[]>([])
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  // Settings state
  const [latexMappings, setLatexMappings] = useState<Record<string, string>>(defaultLatexMappings)
  const [newCommand, setNewCommand] = useState("")
  const [newReplacement, setNewReplacement] = useState("")
  const [editingCommand, setEditingCommand] = useState("")

  // Pause settings
  const [pauseSettings, setPauseSettings] = useState({
    period: 1000, // ms
    newline: 800, // ms
    space: 200, // ms
    comma: 500, // ms
  })

  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null

  // Split text into sentences when input changes
  useEffect(() => {
    if (input) {
      const parsedText = parseLatex(input, latexMappings)
      // Split by sentence endings or equation separations
      const sentenceArray = parsedText
        .replace(/([.!?])\s*/g, "$1|")
        .split("|")
        .filter((sentence) => sentence.trim().length > 0)

      setSentences(sentenceArray)
    } else {
      setSentences([])
    }
  }, [input, latexMappings])

  // Handle speech synthesis with custom pauses
  const speak = (text: string, index: number) => {
    if (!speechSynthesis) return

    speechSynthesis.cancel() // Cancel any ongoing speech

    // Insert SSML-like pauses based on punctuation
    const textWithPauses = text
      .replace(/\.\s+/g, `. <break time="${pauseSettings.period}ms"/> `)
      .replace(/\n/g, ` <break time="${pauseSettings.newline}ms"/> `)
      .replace(/,\s+/g, `, <break time="${pauseSettings.comma}ms"/> `)
      .replace(/\s+/g, ` <break time="${pauseSettings.space}ms"/> `)

    // Process the text with pauses
    const segments = textWithPauses.split(/<break time="(\d+)ms"\/>/)

    const speakSegment = (segmentIndex: number) => {
      if (segmentIndex >= segments.length) {
        if (index < sentences.length - 1) {
          speak(sentences[index + 1], index + 1)
        } else {
          setIsPlaying(false)
          setCurrentUtterance(null)
        }
        return
      }

      const segment = segments[segmentIndex]

      // If this is a pause duration
      if (segmentIndex % 2 === 1) {
        const pauseDuration = Number.parseInt(segment, 10)
        setTimeout(() => speakSegment(segmentIndex + 1), pauseDuration)
        return
      }

      // Skip empty segments
      if (!segment.trim()) {
        speakSegment(segmentIndex + 1)
        return
      }

      const utterance = new SpeechSynthesisUtterance(segment)
      utterance.rate = rate

      utterance.onend = () => {
        speakSegment(segmentIndex + 1)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
        setCurrentUtterance(null)
      }

      speechSynthesis.speak(utterance)
      setCurrentUtterance(utterance)
    }

    speakSegment(0)
    setCurrentSentence(index)
    setIsPlaying(true)
  }

  // Play/pause control
  const togglePlayback = () => {
    if (isPlaying) {
      speechSynthesis?.pause()
      setIsPlaying(false)
    } else {
      if (speechSynthesis?.paused) {
        speechSynthesis.resume()
      } else if (sentences.length > 0) {
        speak(sentences[currentSentence], currentSentence)
      }
      setIsPlaying(true)
    }
  }

  // Rewind 5 seconds (approximate)
  const rewind = () => {
    if (!speechSynthesis || !currentUtterance) return

    speechSynthesis.cancel()

    // Restart current sentence
    speak(sentences[currentSentence], currentSentence)
  }

  // Restart current sentence
  const restartSentence = () => {
    if (!speechSynthesis) return

    speechSynthesis.cancel()
    speak(sentences[currentSentence], currentSentence)
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
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mappings">LaTeX Mappings</TabsTrigger>
                  <TabsTrigger value="pauses">Pause Settings</TabsTrigger>
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
                            <div className="font-mono text-sm">{command}</div>
                            <div>{replacement}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMapping(command)}
                              className="h-8 px-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
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

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={rewind} disabled={!sentences.length}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button onClick={togglePlayback} disabled={!sentences.length}>
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="outline" size="icon" onClick={restartSentence} disabled={!sentences.length}>
                <RefreshCw className="h-4 w-4" />
              </Button>
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
