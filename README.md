# Decode: Interactive Interview Preparation Platform

![UNIFY Logo](./images/unify.png)

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://25q1-team2.vercel.app)  
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Demo & Screenshots](#demo--screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [Team UNIFY](#team-unify)
- [License](#license)

---

## App Description
**Hired.exe** is a web-based quiz application that empowers aspiring programmers and tech professionals to prepare for technical interviews through randomized question sets and AI-assisted feedback. Users can also create and study custom flashcards to reinforce key concepts before attempting quizzes, combining active recall with practical application for a well-rounded prep experience.

## Group Photo

<p align="center">
  <img src="./images/group.png" alt="Team UNIFY Group Photo" style="max-width: 100%; height: auto;/>
</p>

<p align="center"><em>Team UNIFY – Built different 💪</em></p>


## Demo

🔗 Live: [https://25q1-team2.vercel.app](https://25q1-team2.vercel.app)

## 📸 Screenshot Gallery

<table>
  <!-- Row 1 -->
  <tr>
    <td align="center" width="50%">
      <img src="./images/dashboard.png" alt="Dashboard" width="100%"/><br/>
      <strong>Dashboard</strong>
    </td>
    <td align="center" width="50%">
      <img src="./images/flashcards.png" alt="Flashcards" width="100%"/><br/>
      <strong>Flashcards</strong>
    </td>
  </tr>

  <!-- Row 2 -->
  <tr>
    <td align="center" width="50%">
      <img src="./images/questions.png" alt="Questions" width="100%"/><br/>
      <strong>Questions</strong>
    </td>
    <td align="center" width="50%">
      <img src="./images/mockinterview.png" alt="Mock Interview" width="100%"/><br/>
      <strong>Mock Interview</strong>
    </td>
  </tr>

  <!-- Row 3 -->
  <tr>
    <td align="center" width="50%">
      <img src="./images/feedback.png" alt="AI Feedback" width="100%"/><br/>
      <strong>AI Feedback</strong>
    </td>
    <td align="center" width="50%">
      <img src="./images/voiceInterview.png" alt="Voice Interview" width="100%"/><br/>
      <strong>Voice Interview</strong>
    </td>
  </tr>

  <!-- Row 4 -->
  <tr>
    <td align="center" colspan="2">
      <img src="./images/about.png" alt="About" width="50%"/><br/>
      <strong>About</strong>
    </td>
  </tr>
</table>


## Features
- 🔒 Secure auth via Clerk  
- 🃏 Flashcards: create, edit, delete, review  
- 💬 Text interviews: random questions + GPT feedback  
- 🎙️ Voice interviews: record, Whisper‑transcribe, GPT‑evaluate  
- ⭐ STAR‑method scoring & improvement tips  
- 📈 Dashboard: track past sessions & feedback  

---

## Tech Stack

| Layer         | Tech                            |
| ------------- | ------------------------------- |
| Frontend      | Next.js, React, TypeScript      |
| Styling       | CSS Modules                     |
| Backend       | Next.js API Routes, Node.js     |
| ORM & Database| Prisma, PostgreSQL              |
| Auth          | Clerk                           |
| AI Services   | OpenAI API (ChatGPT, Whisper)   |
| Deployment    | Vercel                          |

---

## Getting Started

### Requirements
- Node.js 18+
- npm
- Git
- PostgreSQL DB (local or Prisma Cloud)

### Install & Run

```bash
git clone https://github.com/code-differently/25q1-team2.git
cd 25q1-team2
cp .env.example .env.local
npm install
npm run dev
```

- http://localhost:3000 — App  
- http://localhost:5555 — Prisma Studio

---

## Usage

1. Sign up / log in via Clerk
2. **Flashcards**: add & review cards
3. **Mock Interview**: text‑based practice
4. **Voice Interview**: record & get AI feedback
5. **History**: revisit past sessions

---

## Testing

### Run Cypress Tests
```bash
npx cypress open       # GUI
npx cypress run        # Headless
```

### View Test Coverage
```bash

npx nyc report --reporter=lcov
open coverage/lcov-report/index.html

```

---

## Known Issues
- [ ] Light/dark mode toggle causes layout shifts  
- [ ] Feedback containers overflow on small screens  
- [ ] Whisper transcription lags on headless Cypress

---

## Roadmap & Future Features
- 📊 Admin panel  
- 🔔 Reminder notifications  
- ⭐ Flashcard scoring  
- 🎮 Concept mini-games  
- 🖼️ Avatars  
- ♿ Accessibility

---

## Team UNIFY

### Our Mission

> Empower aspiring tech professionals with engaging, AI‑driven practice tools that build confidence and simulate real interview scenarios.

<table>
  <tr>
    <td align="center">
      <img src="./images/karen.png" alt="Karen Alabi" width="100" height="100" /><br>
      <strong>Karen Alabi</strong><br>Project Manager
    </td>
    <td align="center">
      <img src="./images/justin.png" alt="Justin Eklund" width="100" height="100" /><br>
      <strong>Justin Eklund</strong><br>QA & Documentation
    </td>
    <td align="center">
      <img src="./images/dylan.png" alt="Dylan Lafferty" width="100" height="100" /><br>
      <strong>Dylan Lafferty</strong><br>Lead Developer
    </td>
    <td align="center">
      <img src="./images/bryana.png" alt="Bryana Singleton‑Barnhart" width="100" height="100" /><br>
      <strong>Bryana Singleton‑Barnhart</strong><br>UI/UX Designer
    </td>
    <td align="center">
      <img src="./images/meiko.png" alt="Meiko Stephens" width="100" height="100" /><br>
      <strong>Meiko Stephens</strong><br>DevOps Engineer
    </td>
  </tr>
</table>

---

## Contributing
1. Fork  
2. Create branch `git checkout -b feature/MyFeature`  
3. Commit + push  
4. PR to `main`

---

## License

MIT © UNIFY Team

---

## Acknowledgements
- Clerk  
- Prisma  
- OpenAI  
