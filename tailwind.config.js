module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans' ],
    },
    extend: {
      transitionProperty: {
        'height': 'max-height'
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}