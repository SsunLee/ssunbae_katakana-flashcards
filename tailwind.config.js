/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // shadcn/ui를 위한 다크모드 설정 추가
  content: [
    './app/**/*.{ts,tsx}', // ★★★ Next.js App Router에 맞게 경로를 수정했습니다.
    './components/**/*.{ts,tsx}', // 혹시 모를 경로
    './src/**/*.{ts,tsx}', // 혹시 모를 경로
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ★★★ shadcn/ui가 필요로 하는 색상 정의를 추가했습니다. (이것이 오류를 해결합니다)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // ★★★ 기존에 사용하시던 사용자 정의 폰트를 그대로 유지했습니다!
      fontFamily: {
        jp: [
          "'Zen Kaku Gothic New'",
          "'Noto Sans JP'",
          "'Noto Serif JP'",
          "'Kosugi Maru'",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "Yu Gothic UI",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

