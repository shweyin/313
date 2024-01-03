/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
 
    extend: {
      colors: {
        'top': '#72C9F6',
        'top-button': '#2B347D',
  
        
      },
      backgroundImage: {
        'snow': "url('/assets/snow.jpg')",
        'sky': "url('/assets/sky.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}