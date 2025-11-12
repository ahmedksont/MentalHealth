"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Calendar, Clock, Check } from "lucide-react"
import Link from "next/link"

export default function Reservations() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    consultationType: "virtual",
    date: "",
    time: "",
    reason: "",
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleReserveClick = (type: string) => {
    setFormData((prev) => ({ ...prev, consultationType: type }))
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.date && formData.time && formData.reason) {
      setBookingConfirmed(true)
    }
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Confirmation Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 border border-border text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed</h1>
            <p className="text-muted-foreground mb-8">Your consultation has been scheduled successfully.</p>

            {/* Confirmation Details */}
            <div className="bg-muted rounded-lg p-6 mb-8 text-left space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Consultation Type</p>
                <p className="font-semibold text-foreground capitalize">{formData.consultationType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground">{formData.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold text-foreground">{formData.time}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90">Add to Calendar</Button>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              You will receive a reminder email 24 hours before your appointment.
            </p>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-3xl font-bold text-foreground">Book Consultation</h1>
            <p className="text-muted-foreground">Schedule an appointment with a mental health professional</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-primary" : "bg-border"}`}></div>
          ))}
        </div>

        {/* Step 1: Choose Consultation Type */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white dark:bg-slate-900 rounded-xl p-8 border-2 border-border hover:border-primary cursor-pointer transition-all"
              onClick={() => handleReserveClick("virtual")}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">Virtual Consultation</h3>
              <p className="text-muted-foreground mb-6">
                Speak with a doctor via video call from the comfort of your home.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>✓</span> Video + Audio
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Flexible Timing
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Privacy Protected
                </li>
              </ul>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Choose This</Button>
            </div>

            <div
              className="bg-white dark:bg-slate-900 rounded-xl p-8 border-2 border-border hover:border-primary cursor-pointer transition-all"
              onClick={() => handleReserveClick("physical")}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">Physical Consultation</h3>
              <p className="text-muted-foreground mb-6">
                Visit our clinic for an in-person consultation with a doctor.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>✓</span> Face-to-Face
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Professional Setting
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Complete Assessment
                </li>
              </ul>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Choose This</Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Schedule Your {formData.consultationType} Consultation
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setStep(3)
              }}
              className="space-y-6"
            >
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </label>
                <Input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Select Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="02:00">02:00 PM</option>
                  <option value="03:00">03:00 PM</option>
                  <option value="04:00">04:00 PM</option>
                </select>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  Next
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {step === 3 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tell Us More</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reason for Consultation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason for Consultation</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Please describe what you'd like to discuss..."
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                ></textarea>
              </div>

              {/* Consultation Summary */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-3">Consultation Summary</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Type: <span className="text-foreground font-medium capitalize">{formData.consultationType}</span>
                  </p>
                  <p>
                    Date: <span className="text-foreground font-medium">{formData.date}</span>
                  </p>
                  <p>
                    Time: <span className="text-foreground font-medium">{formData.time}</span>
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
