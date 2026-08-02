import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#010b0c',
        'mim-saffron': '#eeba00',
        'spanish-orange': '#e46e00',
        'jordy-blue': '#8db5f3',
        'alice-blue': '#f4f8fe',
      },
      fontFamily: {
        barlow: ['var(--font-barlow)', 'Barlow', 'sans-serif'],
        'noto-serif': ['var(--font-noto)', 'Noto Serif Display', 'serif'],
        unbounded: ['var(--font-unbounded)', 'Unbounded', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
