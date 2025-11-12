"use client"

import type React from "react"

import Link from "next/link"
import { Heart, Brain, Camera, MessageCircle, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MindCare</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Personal AI Mental Health Companion
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Get personalized support, track your emotions, connect with professionals, and take the first step towards
            better mental health.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Depression Assessment"
            description="Take a comprehensive questionnaire to understand your current emotional state and get personalized insights."
          />
          <FeatureCard
            icon={<Camera className="w-8 h-8" />}
            title="Emotion Detection"
            description="Advanced AI analysis of your facial expressions to provide real-time emotional feedback and awareness."
          />
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8" />}
            title="AI Chatbot Support"
            description="24/7 conversational support from our intelligent AI designed to listen, understand, and help."
          />
          <FeatureCard
            icon={<Phone className="w-8 h-8" />}
            title="Direct Doctor Call"
            description="Connect directly with licensed mental health professionals when you need immediate professional support."
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Book Consultations"
            description="Schedule physical or virtual consultations with doctors at times that work best for you."
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="Your Wellness"
            description="Track your progress, maintain your mental health journal, and celebrate your wellness journey."
          />
        </div>

        {/* CTA Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Take Care of Your Mental Health?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who are already improving their mental wellness with MindCare.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline">
                Already a Member?
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
