/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 
    './client/**/*.tsx',            // Main HTML file
    './src/**/*.{js,ts,jsx,tsx}',  // All source files in your project
    './client/**/*.{js,ts,jsx,tsx}',  // Adjust based on your folder structure


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


