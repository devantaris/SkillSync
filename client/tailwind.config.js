/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0f0f0f',
          soft: '#3a3a3a',
          muted: '#777777',
        },
        surface: {
          DEFAULT: '#fafaf8',
          card: '#ffffff',
          alt: '#f4f3ef',
        },
        brand: {
          DEFAULT: '#2563eb',
          soft: '#eff4ff',
        },
        earn: {
          DEFAULT: '#16a34a',
          soft: '#f0fdf4',
        },
        warn: {
          DEFAULT: '#d97706',
          soft: '#fffbeb',
        },
        danger: {
          DEFAULT: '#dc2626',
          soft: '#fef2f2',
        },
        border: '#e5e4e0',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
        'input': '8px',
      },
    },
  },
  plugins: [],
}
