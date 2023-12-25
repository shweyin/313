/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
 
    extend: {
      colors: {
        'top': '#72C9F6',
        'top-button': '#2B347D',
  
        
      },
      backgroundImage: {
        'snow': "url('/assets/images/snow.jpg')",
        'sky': "url('/assets/images/sky.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
