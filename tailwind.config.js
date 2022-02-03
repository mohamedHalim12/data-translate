/* eslint-disable global-require */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    extend: {},
  },
};
