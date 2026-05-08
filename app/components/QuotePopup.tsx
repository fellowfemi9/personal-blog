"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const QUOTES = [
  { text: "You are not behind. You are exactly where you need to be.", author: "Femi9 Power" },
  { text: "Your body is doing something miraculous. Trust it.", author: "Femi9 Power" },
  { text: "Strong women don't have it easy. They just refuse to stop.", author: "Femi9 Power" },
  { text: "Softness is not weakness. It is the most radical form of strength.", author: "Femi9 Power" },
  { text: "You grew a human. You can handle anything.", author: "Femi9 Power" },
  { text: "Rest is not a reward. It is a requirement.", author: "Femi9 Power" },
  { text: "The version of you that keeps going is already extraordinary.", author: "Femi9 Power" },
  { text: "Nourish yourself like you matter. Because you do.", author: "Femi9 Power" },
  { text: "You don't have to choose between ambition and softness. Own both.", author: "Femi9 Power" },
  { text: "Your intuition about your body is data. Listen to it.", author: "Femi9 Power" },
  { text: "Motherhood is not the end of your story. It is the plot twist that makes it legendary.", author: "Femi9 Power" },
  { text: "You are allowed to feel everything and still show up.", author: "Femi9 Power" },
  { text: "Healing is not linear. Be patient with the woman in the mirror.", author: "Femi9 Power" },
  { text: "Every meal you prepare with intention is an act of love — for yourself first.", author: "Femi9 Power" },
  { text: "The hardest seasons grow the deepest roots.", author: "Femi9 Power" },
  { text: "Your worth is not measured by your productivity. Not today. Not ever.", author: "Femi9 Power" },
  { text: "You are building a whole human while being a whole human. That is everything.", author: "Femi9 Power" },
  { text: "Ask for help like it's a superpower. Because it is.", author: "Femi9 Power" },
  { text: "The woman who knows what she needs is unstoppable.", author: "Femi9 Power" },
  { text: "Radiate strength, even on the days you feel it least.", author: "Femi9 Power" },
  { text: "A rested mother is a present mother. Sleep without guilt.", author: "Femi9 Power" },
  { text: "You are not just surviving. You are learning your own power.", author: "Femi9 Power" },
  { text: "Feed your body well. It is the only home you will ever truly own.", author: "Femi9 Power" },
  { text: "The fourth trimester is hard. You are not doing it wrong.", author: "Femi9 Power" },
  { text: "Boundaries are not walls. They are the blueprint of your peace.", author: "Femi9 Power" },
];

const FIRST_SHOW_MS = 40_000;
const INTERVAL_MS = 3 * 60_000;

export default function QuotePopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 350);
  }, []);

  const showNext = useCallback(() => {
    const next = (indexRef.current + 1) % QUOTES.length;
    indexRef.current = next;
    setQuoteIndex(next);
    setExiting(false);
    setVisible(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Randomise starting quote
    const start = Math.floor(Math.random() * QUOTES.length);
    indexRef.current = start;
    setQuoteIndex(start);

    timerRef.current = setTimeout(() => {
      setVisible(true);
      timerRef.current = setInterval(showNext, INTERVAL_MS);
    }, FIRST_SHOW_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showNext]);

  if (!mounted) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[9999] max-w-xs w-[calc(100vw-3rem)] sm:w-80 pointer-events-none"
    >
      <div
        className="pointer-events-auto transition-all duration-350 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible && !exiting ? "translateY(0)" : "translateY(24px)",
          transitionProperty: "opacity, transform",
          transitionDuration: "350ms",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {visible && (
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #0A0414 0%, #2d0a4e 50%, #1a0a2e 100%)",
              border: "1px solid rgba(255,215,0,0.25)",
              boxShadow: "0 8px 40px rgba(100,20,180,0.4), 0 0 0 1px rgba(255,215,0,0.1)",
            }}
          >
            {/* Gold shimmer top bar */}
            <div
              className="h-0.5 w-full"
              style={{ background: "linear-gradient(90deg, transparent, #FFD700, #F0A820, transparent)" }}
            />

            <div className="px-5 pt-4 pb-5">
              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Dismiss quote"
                className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors text-lg leading-none"
              >
                ×
              </button>

              {/* Femi9 label */}
              <p className="text-amber-400/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                ✦ Femi9 Power
              </p>

              {/* Quote */}
              <blockquote
                className="text-white/90 font-black leading-snug mb-3"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                }}
              >
                &ldquo;{QUOTES[quoteIndex].text}&rdquo;
              </blockquote>

              {/* Author + progress dots */}
              <div className="flex items-center justify-between">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#FFD700", opacity: 0.7 }}
                >
                  — {QUOTES[quoteIndex].author}
                </p>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: i === quoteIndex % 3 ? "14px" : "5px",
                        height: "5px",
                        background: i === quoteIndex % 3 ? "#FFD700" : "rgba(255,215,0,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
