/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    deep: "#0A2342",
                    cyan: "#00D9FF",
                    ocean: "#1E3A8A",
                    electric: "#0EA5E9",
                },
                secondary: {
                    emerald: "#00C9A7",
                    forest: "#059669",
                    mint: "#6EE7B7",
                },
                accent: {
                    warning: "#FFB627",
                    danger: "#EF4444",
                    success: "#10B981",
                    info: "#8B5CF6",
                },
                bg: {
                    dark: "#0F172A",
                    darker: "#020617",
                    card: "rgba(15, 23, 42, 0.7)",
                    glass: "rgba(255, 255, 255, 0.05)",
                },
                'ocean-deep': '#0A2342',
                'cyan-electric': '#00D9FF',
                'aqua-life': '#00C9A7',
            },
            fontFamily: {
                display: ["Orbitron", "sans-serif"],
                body: ["Space Grotesk", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
