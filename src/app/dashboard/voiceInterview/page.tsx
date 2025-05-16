"use client";


import { useRef, useState } from 'react';
import React from 'react';

export default function InterviewAssistant() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [aiAudioURL, setAiAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    audioChunks.current = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.current.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
      const formData = new FormData()
      formData.append('audio', audioBlob, 'user-input.webm')

      setAudioURL(URL.createObjectURL(audioBlob))

      const res = await fetch('/api/interview-voice', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setAiAudioURL(data.audioUrl)
    }

    mediaRecorder.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">🎤 AI Interview Assistant</h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xl"
      >
        {isRecording ? '🛑 Stop Recording' : '🎙️ Start Speaking'}
      </button>

      {audioURL && (
        <div className="mt-6">
          <h2 className="font-semibold">Your Input:</h2>
          <audio controls src={audioURL} className="mt-2" />
        </div>
      )}

      {aiAudioURL && (
        <div className="mt-6">
          <h2 className="font-semibold">AI Response:</h2>
          <audio controls src={aiAudioURL} className="mt-2" />
        </div>
      )}
    </div>
  )
}