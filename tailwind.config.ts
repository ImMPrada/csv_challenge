import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#A729F5',
        'purple-light': '#F1D3FF', // Updated to an even lighter shade
        'navy': {
          DEFAULT: '#313E51',
          dark: '#3B4D66',
        },
        'grey': {
          DEFAULT: '#626C7F',
          light: '#ABC1E1',
        },
        'white': {
          DEFAULT: '#FFFFFF',
          light: '#F4F6FA',
        },
        'green': '#26D782',
        'red': '#EE5454',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      fontSize: {
        'heading-2xl': ['3.5rem', '4rem'],
        'heading-xl': ['5.5rem', '6rem'],
        'heading-l': ['4rem', '4.5rem'],
        'heading-m': ['2.25rem', '2.75rem'],
        'heading-s': ['1.25rem', '1.5rem'],
        'body-m': ['1.125rem', '1.5rem'],
        'body-s': ['0.875rem', '1.25rem'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
  plugins: [],
} satisfies Config
