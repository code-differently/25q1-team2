'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../../styles/VoiceInterview.module.css';

/**
 * InterviewAssistant component for AI-driven voice and text mock interviews.
 *
 * Provides functionality to record or type user responses, transcribe audio, and generate AI feedback.
 *
 * @returns JSX.Element The interview assistant UI.
 */
export default function InterviewAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [userText, setUserText] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [mode, setMode] = useState<'voice' | 'text'>('voice');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const greeted = useRef(false);
  const chatRef = useRef<HTMLDivElement>(null);

  /**
   * Auto-scrolls the chat window on new message insertion.
   */
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatLog]);

  /**
   * Loads available speech synthesis voices and sets the preferred voice.
   */
  useEffect(() => {
    const loadVoices = () => {
      const list = speechSynthesis.getVoices();
      const top5 = list.slice(0, 5);
      setVoices(top5);

      const saved = localStorage.getItem('preferredVoice');
      if (saved) {
        const found = top5.find(v => v.name === saved);
        if (found) setSelectedVoice(found);
      } else if (top5.length) {
        setSelectedVoice(top5[0]);
      }
    };
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  /**
   * Speaks the given text using the selected speech synthesis voice.
   *
   * @param text The text to speak.
   */
  const speak = (text: string) => {
    if (!selectedVoice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  };

  /**
   * Types the given text into the chat window with a typewriter effect.
   *
   * @param text The text to display.
   * @param sender Indicates whether the text is from the 'ai' or 'user'.
   */
  const typeText = async (text: string, sender: 'ai' | 'user') => {
    if (!text) return;
    setIsTyping(true);
    for (let i = 1; i <= text.length; i++) {
      const slice = text.slice(0, i);
      setChatLog(prev => {
        if (i === 1) {
          return [...prev, { sender, text: slice }];
        } else {
          const copy = [...prev];
          copy[copy.length - 1] = { sender, text: slice };
          return copy;
        }
      });
      await new Promise(r => setTimeout(r, 20));
    }
    setIsTyping(false);
  };

  /**
   * Greets the user on initial render with a welcome message.
   */
  useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;
    const greet = 'Welcome to your AI mock interview! When you’re ready, answer the first question: “Tell me about yourself.”';
    speak(greet);
    typeText(greet, 'ai');
  }, []);

  /**
   * Handles the display of user and AI messages.
   *
   * @param userMessage The user's input message.
   * @param aiMessage The AI's response message.
   */
  const handleResponse = (userMessage: string, aiMessage: string) => {
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    speak(aiMessage);
    typeText(aiMessage, 'ai');
  };

  /**
   * Starts recording audio from the user's microphone.
   */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    audioChunks.current = [];
    mr.ondataavailable = e => e.data.size && audioChunks.current.push(e.data);
    mr.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const fd = new FormData();
      fd.append('audio', blob, 'user.webm');
      const res = await fetch('/api/transcribe', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.transcript && data.aiText) handleResponse(data.transcript, data.aiText);
    };
    mr.start();
    setIsRecording(true);
  };

  /**
   * Stops recording audio and processes the recorded data.
   */
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  /**
   * Handles text submissions from the input form.
   *
   * @param event The form submission event.
   */
  const handleTextSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userText.trim()) return;
    const res = await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userText }),
    });
    const data = await res.json();
    if (data.aiText) handleResponse(userText, data.aiText);
    setUserText('');
  };

  /**
   * Handles selection of a new speech synthesis voice.
   *
   * @param name The name of the selected voice.
   */
  const handleVoiceSelect = (name: string) => {
    const v = voices.find(v => v.name === name);
    if (v) {
      setSelectedVoice(v);
      localStorage.setItem('preferredVoice', v.name);
    }
  };

  return (
    <>
      <div className={styles.background} />

      <div className={styles.container}>
        <div ref={chatRef} className={styles.chatWindow}>
          {chatLog.map((m, i) => (
            <div key={i} className={styles.message}>
              <div className={`${styles.bubble} ${m.sender === 'ai' ? styles.ai : styles.user}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.toggleMode}
            onClick={() => setMode(prev => (prev === 'voice' ? 'text' : 'voice'))}
          >
            🎚️ Switch to {mode === 'voice' ? 'Text' : 'Voice'}
          </button>

          {mode === 'voice' ? (
            <button
              className={styles.recordButton}
              disabled={isTyping}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? '🛑 Stop Recording' : '🎙️ Start Speaking'}
            </button>
          ) : (
            <form onSubmit={handleTextSubmit} className={styles.controls}>
              <input
                className={styles.textInput}
                placeholder='Type your answer...'
                value={userText}
                onChange={e => setUserText(e.target.value)}
              />
              <button type='submit' className={styles.sendButton} disabled={isTyping}>
                🚀 Send
              </button>
            </form>
          )}

          <button className={styles.stopButton} onClick={() => speechSynthesis.cancel()}>
            ⏹️ Stop Speaking
          </button>

          <select
            className={styles.voiceSelect}
            value={selectedVoice?.name || ''}
            onChange={e => handleVoiceSelect(e.target.value)}
          >
            {voices.map((v, i) => (
              <option key={i} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
