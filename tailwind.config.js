module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        width: {
          '100': '25rem',
          '104': '26rem',
          '108': '27rem',
          '112': '28rem',
          '116': '29rem',
          '120': '30rem',
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
      },
    },
    plugins: [],
  }