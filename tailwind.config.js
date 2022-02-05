/* eslint-disable global-require */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': 'url("../public/images/background1.jpg")',
      },
      screens: {
        xsh: { raw: '(min-height: 268px)' },
        smh: { raw: '(min-height: 350px)' },
        tablet: { raw: '(min-width: 640px)' },
      },
    },
  },
};
