/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        recelhubtheme:{
          primary: '#3b82f6',
          secondary: '#19D3AE',
          accent: "#64748b",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}
