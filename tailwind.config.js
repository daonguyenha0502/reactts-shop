module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                '92': '23rem',
                '100': '25rem',
                '104': '26rem',
                '108': '27rem',
                '112': '28rem',
                '116': '29rem',
                '120': '30rem',
            },
            height: {
                '104': '26rem',
                '112': '28rem',
                '120': '30rem'
            },
            minHeight: {
                '32': '8rem',
                '72': '18rem'
            }
        },

    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    plugins: [],
}