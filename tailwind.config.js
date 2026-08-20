/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  // Chatbox theme is driven by a `dark` class on <html>, toggled from the header button
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      backgroundImage: {
        // One glow per drifting element. The long transparent tail keeps the
        // falloff gradual enough that 8-bit colour steps stay invisible.
        "glow-cyan":
          "radial-gradient(closest-side, rgba(34, 211, 238, 0.26) 0%, rgba(34, 211, 238, 0.10) 45%, rgba(34, 211, 238, 0) 100%)",
        "glow-teal":
          "radial-gradient(closest-side, rgba(20, 184, 166, 0.24) 0%, rgba(20, 184, 166, 0.09) 45%, rgba(20, 184, 166, 0) 100%)",
        "glow-sky":
          "radial-gradient(closest-side, rgba(14, 165, 233, 0.20) 0%, rgba(14, 165, 233, 0.08) 45%, rgba(14, 165, 233, 0) 100%)",
        // Fine grain dithered over the page: breaks up the flat bands that a
        // dark gradient otherwise shows as hard stripes.
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "user-bubble": "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
      },

      borderRadius: {
        "bubble-user": "1.25rem 1.25rem 0.375rem 1.25rem",
        attachment: "1rem 1rem 0.25rem 1rem",
      },

      boxShadow: {
        "user-bubble": "0 4px 15px rgba(6, 182, 212, 0.3)",
        "input-glow": "0 0 0 4px rgba(6, 182, 212, 0.1), 0 4px 20px rgba(0, 0, 0, 0.08)",
        attachment: "0 4px 15px rgba(0, 0, 0, 0.1)",
        picker: "0 10px 40px rgba(0, 0, 0, 0.15)",
        cancel: "0 2px 8px rgba(0, 0, 0, 0.15)",
      },

      keyframes: {
        // Each glow travels its own path. Only transform moves, so the browser
        // composites the drift on the GPU instead of repainting the gradient.
        driftOne: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(22vw, 16vh, 0) scale(1.18)" },
          "66%": { transform: "translate3d(8vw, 34vh, 0) scale(0.92)" },
        },
        driftTwo: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.05)" },
          "33%": { transform: "translate3d(-18vw, 22vh, 0) scale(0.9)" },
          "66%": { transform: "translate3d(-30vw, -12vh, 0) scale(1.2)" },
        },
        driftThree: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(0.95)" },
          "33%": { transform: "translate3d(16vw, -20vh, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-14vw, -8vh, 0) scale(1)" },
        },
        // Opacity only — also compositor-driven, so it stacks on the drift
        // without fighting it for the transform property.
        glowPulse: {
          "0%": { opacity: "0.75" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        messageSlideIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "40%": { transform: "rotate(14deg)" },
        },
        dotBounce: {
          "0%, 80%, 100%": { transform: "scale(0.8)", opacity: "0.5" },
          "40%": { transform: "scale(1.2)", opacity: "1" },
        },
        emojiSlideUp: {
          from: { opacity: "0", transform: "translateX(-50%) translateY(10px)" },
          to: { opacity: "1", transform: "translateX(-50%) translateY(0)" },
        },
        statusPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.7)" },
          "50%": { boxShadow: "0 0 0 4px rgba(74, 222, 128, 0)" },
        },
        sendPulse: {
          "0%, 100%": { boxShadow: "0 4px 15px rgba(6, 182, 212, 0.4)" },
          "50%": { boxShadow: "0 4px 25px rgba(6, 182, 212, 0.6)" },
        },
      },

      animation: {
        // Drift and pulse run together on each glow, at lengths that do not
        // line up, so the motion never settles into a visible repeat.
        "drift-one":
          "driftOne 28s ease-in-out infinite, glowPulse 9s ease-in-out infinite alternate",
        "drift-two":
          "driftTwo 34s ease-in-out infinite, glowPulse 11s ease-in-out infinite alternate",
        "drift-three":
          "driftThree 41s ease-in-out infinite, glowPulse 13s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "message-in": "messageSlideIn 0.3s ease-out",
        wave: "wave 2s ease-in-out infinite",
        "dot-bounce": "dotBounce 1.4s ease-in-out infinite",
        "emoji-up": "emojiSlideUp 0.2s ease-out",
        "status-pulse": "statusPulse 2s ease-in-out infinite",
        "send-pulse": "sendPulse 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
