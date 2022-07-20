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
      },
      colors: {
        'primary': {
          '50': '#f1f7fe',
          '100': '#e3eefb',
          '200': '#c0ddf7',
          '300': '#88c2f1',
          '400': '#3d9de6',
          '500': '#2187d6',
          '600': '#136bb6',
          '700': '#115593',
          '800': '#12497a',
          '900': '#143e66',
      },
      'secondary': {
        '50': '#eafff6',
        '100': '#cdfee8',
        '200': '#9ffbd7',
        '300': '#62f3c2',
        '400': '#3de6b3',
        '500': '#00ca94',
        '600': '#00a478',
        '700': '#008464',
        '800': '#006851',
        '900': '#005543',
    },

        neutral: '#000',
      },

    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}