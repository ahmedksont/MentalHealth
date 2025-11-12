"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: "Little interest or pleasure in doing things",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Feeling down, depressed, or hopeless",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Trouble falling or staying asleep, or sleeping too much",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Feeling tired or having little energy",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Poor appetite or overeating",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Feeling bad about yourself",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Trouble concentrating on things",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Moving or speaking so slowly that others could have noticed",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getDepressionLevel = () => {
    const score = answers.reduce((a, b) => a + b, 0)
    if (score < 5)
      return { level: "Minimal", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" }
    if (score < 10) return { level: "Mild", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" }
    if (score < 15)
      return { level: "Moderate", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" }
    if (score < 20)
      return {
        level: "Moderately Severe",
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      }
    return { level: "Severe", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" }
  }

  const getRecommendation = () => {
    const score = answers.reduce((a, b) => a + b, 0)
    if (score < 5) return "You appear to be in good mental health. Continue maintaining healthy habits."
    if (score < 10) return "Consider talking to a counselor or therapist for support."
    if (score < 15) return "It would be beneficial to speak with a mental health professional."
    if (score < 20) return "Please consider reaching out to a therapist or doctor soon."
    return "Please consult with a mental health professional as soon as possible."
  }

  if (showResults) {
    const result = getDepressionLevel()
    const score = answers.reduce((a, b) => a + b, 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">Assessment Results</span>
          </div>

          {/* Results Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 border border-border text-center">
            <div className="mb-8">
              <Check className="w-16 h-16 text-teal-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Assessment Complete</h1>
            </div>

            {/* Score */}
            <div className="mb-8 p-6 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-2">Your Depression Score</p>
              <p className="text-5xl font-bold text-primary mb-2">{score}</p>
              <p className="text-sm text-muted-foreground">out of 32</p>
            </div>

            {/* Level */}
            <div className="mb-8">
              <p className="text-muted-foreground mb-2">Assessment Level</p>
              <div className={`inline-block px-6 py-2 rounded-lg font-semibold ${result.color}`}>{result.level}</div>
            </div>

            {/* Recommendation */}
            <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-foreground font-medium mb-2">Recommendation</p>
              <p className="text-muted-foreground">{getRecommendation()}</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link href="/chatbot">
                <Button className="w-full bg-primary hover:bg-primary/90">Chat with AI Assistant</Button>
              </Link>
              <Link href="/doctor-call">
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Doctor Call
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-10">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  answers[currentQuestion] === index
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="font-medium text-foreground">{option}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!isAnswered} className="flex-1 bg-primary hover:bg-primary/90">
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
