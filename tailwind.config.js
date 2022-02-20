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
        mdh: { raw: '(min-height: 500px)' },
        lgh: { raw: '(min-height: 775px)' },
        xlh: { raw: '(min-height: 900px)' },
        '2xlh': { raw: '(min-height: 1200px)' },
        tablet: { raw: '(min-width: 640px)' },
      },
    },
  },
};
