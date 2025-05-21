"use client";

import React from "react";
import styles from "../../../../styles/AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.gradientOverlay} />
      <h1 className={styles.title}>HIRED.EXE</h1>

      {/* Text Content */}
      <div className={styles.content}>
        <p><strong>Welcome to Hired.exe! Your Final Stop Before Interview Greatness</strong></p>
        <p><strong>This isn’t just practice. This is transformation.</strong></p>

        <p>
          Hired.exe is a high-impact tech interview simulator that turns prep into power. Built for aspiring engineers, developers, and problem-solvers, it’s your all-in-one toolkit for conquering interviews with confidence and landing the job of your dreams.
        </p>

        <p><strong>Inside this immersive experience, you’ll:</strong></p>
        <p>
          <em>Master the Essentials</em> – Blaze through lightning-fast flash cards that drill the fundamentals: algorithms, data structures, system design, and more.
        </p>

        <p>
          <em>Sharpen Your Voice</em> – Practice real interview questions — technical, behavioral, and everything in between — and refine your answers until they feel like second nature.
        </p>

        <p>
          <em>Simulate the Real Thing</em> – Enter Mock Interview Mode to face the pressure head-on. Just you, the questions, and your rising skill level.
        </p>

        <p>
          <em>Get Real Feedback, Instantly</em> – See what you’re nailing and where to improve. With targeted feedback and progress tracking, you’ll always know your next move.
        </p>

        <p><strong>By the end, you won’t just feel ready… you’ll feel unshakable.</strong></p>
        <p><strong>This is your launch sequence. This is how you get hired.</strong></p>

        <p>
          No more guessing. No more hoping. With Hired.exe, you’ll walk into your next tech interview knowing exactly what to do and why you belong in the room.
        </p>

        <p className={styles.callToAction}>
          <span><strong>Install</strong> confidence.</span> <span><strong>Run</strong> your future.</span> <br />
          <span><strong>Launch </strong>HIRED.EXE.</span>
        </p>
        <div className={styles.teamSection}>
  <h2 className={styles.teamHeading}>Meet the minds behind the mission:</h2>

  <div className={styles.teamMember}>
    <strong>Dylan</strong> – Technical architect & MVP, who engineered the system’s brainpower.
  </div>

  <div className={styles.teamMember}>
    <strong>Bryana</strong> – UI/UX designer and user advocate, shaping every pixel with purpose and always keeping the user in mind.
  </div>

  <div className={styles.teamMember}>
    <strong>Meiko</strong> – DevOps specialist and back-end powerhouse, ensuring stability and performance from the ground up.
  </div>

  <div className={styles.teamMember}>
    <strong>Karen</strong> – Project strategist and workflow coordinator, aligning vision with execution at every stage.
  </div>

  <div className={styles.teamMember}>
    <strong>Justin</strong> – Content strategist and question curator, crafting the challenge and nuance behind every prompt.
  </div>
</div>

      </div>
    </div>
  );
}
