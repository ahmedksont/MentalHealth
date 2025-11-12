"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, Brain, Camera, MessageCircle, Phone, Calendar, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const modules = [
    {
      href: "/questionnaire",
      icon: Brain,
      title: "Depression Assessment",
      description: "Take a detailed questionnaire to assess your current mood",
      color: "text-blue-500",
    },
    {
      href: "/emotion-detection",
      icon: Camera,
      title: "Emotion Detection",
      description: "Use your camera to analyze your emotional state",
      color: "text-teal-500",
    },
    {
      href: "/chatbot",
      icon: MessageCircle,
      title: "AI Chatbot",
      description: "Chat with our AI for 24/7 mental health support",
      color: "text-indigo-500",
    },
    {
      href: "/doctor-call",
      icon: Phone,
      title: "Doctor Call",
      description: "Schedule or start a call with a mental health professional",
      color: "text-purple-500",
    },
    {
      href: "/reservations",
      icon: Calendar,
      title: "Book Consultation",
      description: "Schedule a physical or virtual consultation",
      color: "text-rose-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MindCare</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, User</span>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Welcome Back</h1>
          <p className="text-lg text-muted-foreground">Choose an activity to continue your mental wellness journey</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link key={module.href} href={module.href}>
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className={`${module.color} mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{module.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{module.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Access Now
                  </Button>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-16 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Your Activity</h2>
          <div className="space-y-4">
            <ActivityItem title="Last Assessment" date="2 days ago" status="completed" />
            <ActivityItem title="Last Chat Session" date="Today" status="completed" />
            <ActivityItem title="Next Consultation" date="Tomorrow at 2:00 PM" status="upcoming" />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/50 z-40">
          <div className="bg-card h-full p-6 w-64">
            <div className="space-y-4">
              <span className="block text-sm text-muted-foreground">Welcome, User</span>
              <Button variant="outline" className="w-full bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ActivityItem({
  title,
  date,
  status,
}: {
  title: string
  date: string
  status: "completed" | "upcoming"
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === "completed"
            ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        }`}
      >
        {status === "completed" ? "Completed" : "Upcoming"}
      </span>
    </div>
  )
}
