'use client';

import React, { useRef, useState } from 'react';
import styles from '../../../../styles/VoiceInterview.module.css';

export default function InterviewAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [aiText, setAiText] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [mode, setMode] = useState<'voice' | 'text'>('voice');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleResponse = (userInput: string, aiResponse: string) => {
    setChatLog((prev) => [
      ...prev,
      { sender: 'user', text: userInput },
      { sender: 'ai', text: aiResponse },
    ]);
    setAiText(aiResponse);
    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(audioBlob));
      const formData = new FormData();
      formData.append('audio', audioBlob, 'user-input.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.aiText && data.transcript) {
        handleResponse(data.transcript, data.aiText);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userText }),
    });

    const data = await res.json();
    if (data.aiText) {
      handleResponse(userText, data.aiText);
      setUserText('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        {chatLog.map((msg, index) => (
          <div key={index} className={styles.message}>
            <div className={`${styles.bubble} ${msg.sender === 'ai' ? styles.ai : styles.user}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={() => setMode(mode === 'voice' ? 'text' : 'voice')} className={styles.toggleMode}>
          🎚️ Switch to {mode === 'voice' ? 'Text' : 'Voice'} Mode
        </button>

        {mode === 'voice' ? (
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? '🛑 Stop Recording' : '🎙️ Start Speaking'}
          </button>
        ) : (
          <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              type="text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Type your answer..."
              style={{
                flexGrow: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #333',
                background: '#111',
                color: '#fff',
              }}
            />
            <button type="submit">🚀 Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
