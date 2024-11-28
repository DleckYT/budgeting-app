/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 
    './client/**/*.tsx',
    './src/**/*.{js,ts,jsx,tsx}',  // All source files in your project
    './client/**/*.{js,ts,jsx,tsx}',  // Adjust based on your folder structure


  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#10B981',
        accent: '#FBBF24',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


