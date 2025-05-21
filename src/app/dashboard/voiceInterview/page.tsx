'use client';
<<<<<<< HEAD
'use client';
'use client';

import React, { useRef, useState } from 'react';
import React, { useRef, useState } from 'react';
=======

import React, { useRef, useState, useEffect } from 'react';
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)
import styles from '../../../../styles/VoiceInterview.module.css';

export default function InterviewAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [userText, setUserText]       = useState('');
  const [chatLog, setChatLog]         = useState<{sender:'user'|'ai';text:string}[]>([]);
  const [mode, setMode]               = useState<'voice'|'text'>('voice');

  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const audioChunks      = useRef<Blob[]>([]);

  // speak + push into chat
  const handleResponse = (userInput: string, aiResponse: string) => {
    // 1) push into chat
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: userInput },
      { sender: 'ai',   text: aiResponse },
    ]);

    // 2) speak it right away
    const utterance = new window.SpeechSynthesisUtterance(aiResponse);
    utterance.rate  = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // on-mount, send a greeting
  useEffect(() => {
    const greeting = 'Welcome to your AI mock interview! When you’re ready, answer the first question: “Tell me about yourself.”';
    setChatLog([{ sender: 'ai', text: greeting }]);
    // speak it, too:
    const u = new window.SpeechSynthesisUtterance(greeting);
    window.speechSynthesis.speak(u);
  }, []);

  // Recording handlers
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr     = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    audioChunks.current = [];

    mr.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.current.push(e.data);
    };

<<<<<<< HEAD
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(audioBlob));
      setAudioURL(URL.createObjectURL(audioBlob));
      const formData = new FormData();
      formData.append('audio', audioBlob, 'user-input.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
=======
    mr.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const form = new FormData();
      form.append('audio', blob, 'input.webm');
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)

      const res  = await fetch('/api/transcribe', { method: 'POST', body: form });
      const data = await res.json();
      if (data.transcript && data.aiText) {
        handleResponse(data.transcript, data.aiText);
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.aiText && data.transcript) {
        handleResponse(data.transcript, data.aiText);
      }
    };

    mr.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Text submit
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;

    const res  = await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userText }),
    });
    const data = await res.json();
    if (data.aiText) {
      handleResponse(userText, data.aiText);
      setUserText('');
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
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.chatWindow}>
          {chatLog.map((m, i) => (
            <div key={i} className={styles.message}>
              <div className={`${styles.bubble} ${styles[m.sender]}`}>
                {m.text}
              </div>
            </div>
<<<<<<< HEAD
          </div>
        ))}
      </div>
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
=======
          ))}
        </div>
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)

        <div className={styles.controls}>
          <button
            className={styles.toggleMode}
            onClick={() => setMode(prev => prev === 'voice' ? 'text' : 'voice')}
          >
            🎚️ Switch to {mode === 'voice' ? 'Text' : 'Voice'}
          </button>

          {mode === 'voice' ? (
            <button
              className={styles.recordButton}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? '🛑 Stop Recording' : '🎙️ Start Speaking'}
            </button>
          ) : (
            <form onSubmit={handleTextSubmit} className={styles.controls}>
              <input
                className={styles.textInput}
                placeholder="Type your answer..."
                value={userText}
                onChange={e => setUserText(e.target.value)}
              />
              <button type="submit" className={styles.sendButton}>
                🚀 Send
              </button>
            </form>
          )}

          {/* new stop‑speech button */}
          <button
            className={styles.stopButton}
            onClick={() => window.speechSynthesis.cancel()}
          >
            ⏹️ Stop Speaking
          </button>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD


=======
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)
