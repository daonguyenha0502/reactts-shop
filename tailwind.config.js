const plugin = require('tailwindcss/plugin')
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
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
                '92': '23rem',
                '104': '26rem',
                '112': '28rem',
                '120': '30rem'
            },
            minHeight: {
                '32': '8rem',
                '72': '18rem'
            },
            minWidth: {
                '24': '6rem'
            },
            translate: {
                '12/100': '12%'
            }
        },

    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.filter-none': {
                    filter: 'none'
                },
                '.filter-brightness-80': {
                    filter: 'brightness(80%)'
                },
                '.filter-brightness-70': {
                    filter: 'brightness(70%)'
                }
            }

            addUtilities(newUtilities, ['dark'])
        })
    ],
}