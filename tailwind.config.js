/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
  plugins: [],
}
