"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react"
import Link from "next/link"

export default function DoctorCall() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  const startCall = () => {
    setIsCallActive(true)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
  }

  const doctorAvailable = {
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    experience: "8 years",
    rating: 4.8,
    imageUrl: "/doctor-profile.jpg",
  }

  if (isCallActive) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        {/* Doctor Video */}
        <div className="w-full max-w-2xl aspect-video bg-gray-900 rounded-lg mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4"></div>
              <p className="text-white text-lg font-semibold">{doctorAvailable.name}</p>
              <p className="text-gray-300 text-sm">{doctorAvailable.specialty}</p>
            </div>
          </div>
          {/* Call duration */}
          <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-lg text-white text-sm font-mono">
            {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, "0")}
          </div>
        </div>

        {/* Local Video Preview */}
        <div className="w-24 h-24 bg-gray-800 rounded-lg border-2 border-primary mb-8">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Video className="w-8 h-8" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button onClick={() => setIsMuted(!isMuted)} variant="outline" className="w-14 h-14 rounded-full border-2">
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            variant="outline"
            className="w-14 h-14 rounded-full border-2"
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>
          <Button onClick={endCall} className="w-14 h-14 rounded-full bg-destructive hover:bg-destructive/90">
            <PhoneOff className="w-6 h-6" />
          </Button>
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
            <h1 className="text-3xl font-bold text-foreground">Connect with Doctor</h1>
            <p className="text-muted-foreground">Direct consultation with licensed professionals</p>
          </div>
        </div>

        {/* Doctor Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-border mb-8">
          <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>

          <div className="px-8 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Doctor Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-1">{doctorAvailable.name}</h2>
                <p className="text-primary font-medium mb-4">{doctorAvailable.specialty}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium text-foreground">{doctorAvailable.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-medium text-foreground">★ {doctorAvailable.rating}/5</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Dr. Johnson specializes in cognitive-behavioral therapy and depression treatment. Available for
                  consultations Monday-Friday, 9am-6pm.
                </p>
              </div>

              {/* Call Status */}
              <div className="w-full md:w-auto text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <Phone className="w-10 h-10 text-green-600 dark:text-green-400 animate-pulse" />
                </div>
                <p className="font-medium text-foreground mb-1">Available Now</p>
                <p className="text-sm text-muted-foreground">Ready to speak</p>
              </div>
            </div>

            {/* Call Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Session Duration</p>
                <p className="font-semibold text-foreground">30-60 min</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Call Type</p>
                <p className="font-semibold text-foreground">Video + Audio</p>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <p className="text-sm text-muted-foreground">Privacy</p>
                <p className="font-semibold text-foreground">Encrypted</p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={startCall}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Start Call Now
            </Button>
          </div>
        </div>

        {/* Available Doctors */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Other Available Doctors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Dr. Michael Chen", specialty: "Psychiatrist", status: "Available in 2 hours" },
              { name: "Dr. Emily Rodriguez", specialty: "Counselor", status: "Available Tomorrow" },
            ].map((doctor, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <p className="font-semibold text-foreground">{doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                <p className="text-sm text-primary mt-2">{doctor.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
