"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function EmotionDetection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [detectedEmotions, setDetectedEmotions] = useState<{ emotion: string; confidence: number }[] | null>(null)

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        setCapturedImage(canvasRef.current.toDataURL("image/jpeg"))

        // Simulate emotion detection
        setDetectedEmotions([
          { emotion: "Happy", confidence: 0.68 },
          { emotion: "Neutral", confidence: 0.22 },
          { emotion: "Sad", confidence: 0.05 },
          { emotion: "Anxious", confidence: 0.03 },
          { emotion: "Calm", confidence: 0.02 },
        ])
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsCameraActive(false)
      setCapturedImage(null)
      setDetectedEmotions(null)
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setDetectedEmotions(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Emotion Detection</h1>
            <p className="text-muted-foreground">Analyze your emotional state using AI</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-border">
          {!isCameraActive && !capturedImage && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Start Emotion Detection</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Enable your camera to analyze your facial expressions and emotional state in real-time.
              </p>
              <Button onClick={startCamera} className="bg-primary hover:bg-primary/90">
                <Camera className="w-4 h-4 mr-2" />
                Enable Camera
              </Button>
            </div>
          )}

          {isCameraActive && !capturedImage && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-xl overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="w-full aspect-video" />
                <div className="absolute inset-0 border-2 border-primary/30 pointer-events-none"></div>
              </div>
              <div className="flex gap-3">
                <Button onClick={capturePhoto} className="flex-1 bg-primary hover:bg-primary/90">
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Emotion
                </Button>
                <Button onClick={stopCamera} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {capturedImage && detectedEmotions && (
            <div className="space-y-6">
              <div>
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured emotion"
                  className="w-full rounded-lg border border-border"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Detected Emotions</h3>
                <div className="space-y-3">
                  {detectedEmotions.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{item.emotion}</span>
                        <span className="text-sm text-muted-foreground">{(item.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${item.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-foreground font-medium mb-1">Emotional State</p>
                <p className="text-muted-foreground">
                  Your primary emotion is {detectedEmotions[0].emotion.toLowerCase()} with high confidence. Remember to
                  practice self-care and mindfulness.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={resetCapture} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Link href="/chatbot" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">Chat with AI</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
