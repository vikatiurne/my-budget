/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#3b82f6',
            dark: {
              50: '#e0f2fe',
              100: '#b8e0fe',
              500: '#0b5ed7',
            },
          },
          secondary: {
            50: '#fefce8',
            100: '#fef9c3',
            500: '#facc15',
            dark: {
              50: '#fef9c3',
              100: '#fef08a',
              500: '#eab308',
            },
          },
          background: {
            light: '#ffffff',
            dark: '#121212',
          },
          foreground: {
            light: '#171717',
            dark: '#e0e0e0',
          },
        },
      },
    },
    darkMode: 'media',
    plugins: [],
  }