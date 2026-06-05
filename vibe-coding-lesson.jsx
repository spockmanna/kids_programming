import { useState } from "react";

const steps = [
  {
    id: 1,
    emoji: "🐙",
    title: "GitHub Account",
    duration: "10 min",
    color: "#f97316",
    tasks: [
      { text: "Go to github.com and sign up", tip: "Pick a username you're proud of — this is your developer identity. Choose wisely!" },
      { text: "Check your email and verify your account", tip: null },
      { text: "Take a quick look around: repos, files, the green commit graph", tip: "Think of GitHub as a time machine for your code. Every save is a snapshot you can go back to." },
    ],
    vibe: "First stop — your very own GitHub account. Every developer in the world has one of these.",
  },
  {
    id: 2,
    emoji: "💻",
    title: "Set Up VS Code",
    duration: "5 min",
    color: "#3b82f6",
    tasks: [
      { text: "Open VS Code and create a new folder for your project", tip: "Name it after your game — something like space-shooter or cookie-clicker." },
      { text: "Create a file inside that folder called index.html", tip: null },
      { text: "Open the Agent panel on the side", tip: "This is your AI coding partner. You describe what you want, it writes the code." },
    ],
    vibe: "Get your workspace ready. You're about to build something real.",
  },
  {
    id: 3,
    emoji: "🎮",
    title: "Build Your Game",
    duration: "35 min",
    color: "#8b5cf6",
    tasks: [
      {
        text: "Decide what game you want to make",
        tip: "You've got 60 seconds — don't overthink it! Some ideas: dodge the falling objects, click the target before it moves, a simple platformer, whack-a-mole. Your call.",
      },
      {
        text: "Type this prompt into the VS Code agent — swap [YOUR IDEA] for your game",
        tip: null,
        isPrompt: true,
        prompt: `Create an HTML file for a basic web game about [YOUR IDEA]. The entire game should be in a single index.html file with no external dependencies. Include:
- A canvas or simple DOM-based game area
- A score counter
- A start screen with the game title
- Basic keyboard or mouse controls
- A game over screen showing the final score
Keep the code simple and well-commented so a beginner can understand it.`,
      },
      {
        text: "Accept the code, then open index.html in your browser to see it running",
        tip: "It's alive! Don't worry if it's rough — that's what the next steps are for.",
      },
      {
        text: "Round 1 — Make it yours: change the title, colors, and any text you want",
        tip: "Talk to the agent in plain English: \"Change the background to dark blue and make the score text yellow.\" You don't need to touch the code directly.",
      },
      {
        text: "Round 2 — Add a feature you came up with yourself",
        tip: "What would make your game more fun? A lives counter? Speed that increases over time? A character with a name? Ask the agent to add it.",
      },
      {
        text: "Round 3 — Add one more thing, or fix something that bugs you",
        tip: "This is your game — make it exactly how you want it. If something feels wrong, describe it to the agent and ask it to fix it.",
      },
    ],
    vibe: "This is the main event. You're the director — the agent is your developer. Describe what you want, see it appear, then improve it.",
  },
  {
    id: 4,
    emoji: "🚀",
    title: "Publish Your Game",
    duration: "10 min",
    color: "#10b981",
    tasks: [
      { text: "Go to github.com → click New repository → name it after your game → set it to Public", tip: null },
      { text: "Drag and drop your index.html file into the repository", tip: "No complicated steps — GitHub's website lets you upload files directly." },
      { text: "Go to Settings → Pages → under Branch, select main → click Save", tip: "GitHub Pages is completely free for public repos. No credit card, no hosting fees — ever." },
      { text: "Wait about 2 minutes → your live URL will appear: yourusername.github.io/your-game-name", tip: "Be patient — it can take a minute or two to go live. Refresh the page if you don't see it yet." },
      { text: "Share your URL with everyone in the room 🎉", tip: "You just put a game on the internet. Anyone in the world can play it." },
    ],
    vibe: "The big moment. In a few minutes you'll have a real URL you can text your friends tonight.",
  },
];

const hints = [
  { icon: "🗣️", text: "Be specific with the agent. Instead of \"make it better\", try \"make the player move faster and add a red trail behind it\"." },
  { icon: "💥", text: "If the agent breaks something, don't panic. Just describe what went wrong and ask it to fix it. That's normal — even for professional developers." },
  { icon: "🤔", text: "Stuck on what to add? Ask yourself: what's the most annoying thing about my game right now? Then fix that." },
];

export default function LessonPlan() {
  const [openStep, setOpenStep] = useState(null);
  const [copied, setCopied] = useState(false);

  const starterPrompt = steps[2].tasks[1].prompt;

  const copyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(starterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d12",
      fontFamily: "Georgia, serif",
      padding: "40px 20px",
      color: "#f0ede8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .step-card { transition: transform 0.18s, box-shadow 0.18s; cursor: pointer; }
        .step-card:hover { transform: translateY(-2px); }
        .task-row { animation: fadeIn 0.2s ease forwards; opacity: 0; }
        @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(-5px); } }
        .copy-btn:hover { background: #3b3b50 !important; }
      `}</style>

      <div style={{ maxWidth: 660, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
            Your 1-Hour Guide
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(38px, 9vw, 64px)",
            lineHeight: 1.05,
            margin: "0 0 16px",
            background: "linear-gradient(135deg, #f97316 0%, #8b5cf6 50%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Build &amp; Ship<br />Your Own Game
          </h1>
          <p style={{ color: "#777", fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: 480 }}>
            Today you'll pick a game idea, use AI to build it, and put it live on the internet — all in an hour. No experience needed.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 27, top: 0, bottom: 0, width: 2,
            background: "linear-gradient(to bottom, #f97316, #3b82f6, #8b5cf6, #10b981)",
            opacity: 0.25,
          }} />

          {steps.map((step, idx) => (
            <div key={step.id} style={{ display: "flex", gap: 22, marginBottom: 20, alignItems: "flex-start" }}>

              <div
                onClick={() => setOpenStep(openStep === idx ? null : idx)}
                style={{
                  width: 54, height: 54, borderRadius: "50%",
                  background: openStep === idx ? step.color : "#1a1a24",
                  border: `2px solid ${step.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0, cursor: "pointer",
                  transition: "background 0.2s, box-shadow 0.2s",
                  position: "relative", zIndex: 1,
                  boxShadow: openStep === idx ? `0 0 18px ${step.color}44` : "none",
                }}
              >
                {step.emoji}
              </div>

              <div
                className="step-card"
                onClick={() => setOpenStep(openStep === idx ? null : idx)}
                style={{
                  flex: 1,
                  background: openStep === idx ? "#18181f" : "#14141b",
                  border: `1px solid ${openStep === idx ? step.color + "55" : "#222230"}`,
                  borderRadius: 14,
                  padding: "18px 22px",
                  boxShadow: openStep === idx ? `0 4px 28px ${step.color}18` : "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: step.color, textTransform: "uppercase", letterSpacing: 2 }}>
                      Step {step.id} · {step.duration}
                    </span>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "3px 0 0", color: "#f0ede8" }}>
                      {step.title}
                    </h2>
                  </div>
                  <span style={{ color: "#444", fontSize: 18, marginLeft: 12 }}>{openStep === idx ? "▴" : "▾"}</span>
                </div>

                {openStep === idx && (
                  <div style={{ marginTop: 18 }}>
                    <p style={{ color: "#555", fontStyle: "italic", fontSize: 12, marginBottom: 18, borderLeft: `2px solid ${step.color}33`, paddingLeft: 10, lineHeight: 1.5 }}>
                      {step.vibe}
                    </p>

                    {step.tasks.map((task, ti) => (
                      <div
                        key={ti}
                        className="task-row"
                        style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "flex-start", animationDelay: `${ti * 55}ms` }}
                      >
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          border: `1.5px solid ${step.color}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1,
                          fontFamily: "'DM Mono', monospace", fontSize: 10, color: step.color,
                        }}>
                          {ti + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: "0 0 5px", fontSize: 14, color: "#ddd8d0", lineHeight: 1.45 }}>{task.text}</p>
                          {task.tip && (
                            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#555", fontStyle: "italic", lineHeight: 1.45 }}>
                              💡 {task.tip}
                            </p>
                          )}
                          {task.isPrompt && task.prompt && (
                            <div style={{ marginTop: 10, background: "#0d0d12", border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 14px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#8b5cf6", letterSpacing: 2, textTransform: "uppercase" }}>
                                  Your Starter Prompt
                                </span>
                                <button
                                  className="copy-btn"
                                  onClick={copyPrompt}
                                  style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                                    color: copied ? "#10b981" : "#777",
                                    background: "#1e1e2e", border: "1px solid #333",
                                    borderRadius: 5, padding: "3px 10px", cursor: "pointer",
                                    transition: "color 0.15s",
                                  }}
                                >
                                  {copied ? "✓ copied" : "copy"}
                                </button>
                              </div>
                              <pre style={{
                                margin: 0, fontSize: 12, color: "#a09898",
                                whiteSpace: "pre-wrap", lineHeight: 1.6,
                                fontFamily: "'DM Mono', monospace",
                              }}>
                                {task.prompt}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hints */}
        <div style={{ marginTop: 36, padding: "26px", background: "#14141b", border: "1px solid #222230", borderRadius: 14 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
            Helpful Tips
          </p>
          {hints.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 17, flexShrink: 0 }}>{t.icon}</span>
              <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.55 }}>{t.text}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 36, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333", letterSpacing: 2 }}>
          TAP EACH STEP TO EXPAND
        </p>
      </div>
    </div>
  );
}
