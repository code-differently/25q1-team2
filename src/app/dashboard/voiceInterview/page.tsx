'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../../styles/VoiceInterview.module.css';

export default function InterviewAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [aiText, setAiText] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [mode, setMode] = useState<'voice' | 'text'>('voice');
  const [isTyping, setIsTyping] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1.0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasWelcomed = useRef<boolean>(false);

  const preferredVoices = ['Google US English', 'Google UK English Male', 'Google UK English Female', 'Samantha', 'Alex', 'Victoria'];

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      const filteredVoices = synthVoices.filter((v) => preferredVoices.includes(v.name));
      setVoices(filteredVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    if (!hasWelcomed.current) {
      hasWelcomed.current = true;
      const welcomeText = `👋 Welcome to the Decode Interview Assistant! You can speak your answers by switching to voice mode and hitting the mic button, or type them in using text mode. I'll listen, respond, and help you sharpen your interview skills. Ready when you are!`;
      simulateTyping(welcomeText);
    }
  }, []);

  const speakText = (text: string) => {
    if (!voices.length) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[selectedVoiceIndex];
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    let currentText = '';
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setAiText(currentText);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    setChatLog((prev) => [...prev, { sender: 'ai', text }]);
    setAiText(null);
    setIsTyping(false);
    speakText(text);
  };

  const handleResponse = (userInput: string, aiResponse: string) => {
    setChatLog((prev) => [...prev, { sender: 'user', text: userInput }]);
    simulateTyping(aiResponse);
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
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);

      const formData = new FormData();
      formData.append('audio', audioBlob, 'user-input.webm');

      try {
        const res = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.aiText && data.transcript) {
          handleResponse(data.transcript, data.aiText);
        }
      } catch (error) {
        console.error('Transcription error:', error);
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

    try {
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
    } catch (error) {
      console.error('Text submission error:', error);
    }
  };

  return (
    <>
      <div className={styles.background} />

      <div className={styles.container}>
        <div className={styles.chatWindow}>
          {chatLog.map((msg, index) => (
            <div key={index} className={styles.message}>
              <div className={`${styles.bubble} ${msg.sender === 'ai' ? styles.bubbleAi : styles.bubbleUser}`}>{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className={styles.message}>
              <div className={styles.bubbleAi}>
                {aiText}
                <span className={styles.cursor}>▌</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlsTopRow}>
            <button onClick={() => setMode(mode === 'voice' ? 'text' : 'voice')} className={styles.toggleMode}>
              🌺 Switch to {mode === 'voice' ? 'Text' : 'Voice'} Mode
            </button>
          </div>

          {mode === 'voice' ? (
            <>
              <div style={{ marginTop: '1rem' }}>
                <button onClick={isRecording ? stopRecording : startRecording}>
                  {isRecording ? '🛑 Stop Recording' : '🎤 Start Speaking'}
                </button>
                <button onClick={stopSpeaking} style={{ marginLeft: '0.5rem' }}>🛑 Stop Voice</button>
              </div>

              {audioURL && (
                <div style={{ marginTop: '0.75rem' }}>
                  <audio ref={audioRef} src={audioURL} controls />
                </div>
              )}

              <div style={{ marginTop: '1rem' }}>
                <label htmlFor="voiceSelect" style={{ color: 'white', marginRight: '8px' }}>Voice:</label>
                <select
                  id="voiceSelect"
                  value={selectedVoiceIndex}
                  onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                  style={{ padding: '4px' }}
                >
                  {voices.map((voice, idx) => (
                    <option key={voice.voiceURI} value={idx}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <label htmlFor="volumeControl" style={{ color: 'white', marginRight: '8px' }}>Volume:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </>
          ) : (
            <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <input
                type="text"
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Type your answer..."
                style={{ flexGrow: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#fff' }}
              />
              <button type="submit">🚀 Send</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
