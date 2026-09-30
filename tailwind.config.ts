import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'portfolio-black': '#080808',
        'portfolio-white': '#f5f2ed',
        'portfolio-off':   '#f0ede8',
        'gray-100': '#e8e5e0',
        'gray-200': '#d0cdc8',
        'gray-300': '#b8b5b0',
        'gray-400': '#a09d98',
        'gray-500': '#888580',
        'gray-600': '#706d68',
        'gray-700': '#585550',
        'gray-800': '#403d38',
        'gray-900': '#282520',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'in-out':    'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '600': '600ms',
        '1000': '1000ms',
      },
      animation: {
        'grain': 'grain-shift 8s steps(10) infinite',
        'marquee': 'marquee-scroll 30s linear infinite',
      },
      keyframes: {
        'grain-shift': {
          '0%':   { transform: 'translate(0, 0)' },
          '10%':  { transform: 'translate(-2%, -3%)' },
          '20%':  { transform: 'translate(4%, 2%)' },
          '30%':  { transform: 'translate(-1%, 4%)' },
          '40%':  { transform: 'translate(3%, -2%)' },
          '50%':  { transform: 'translate(-4%, 1%)' },
          '60%':  { transform: 'translate(2%, 3%)' },
          '70%':  { transform: 'translate(-3%, -1%)' },
          '80%':  { transform: 'translate(1%, -4%)' },
          '90%':  { transform: 'translate(-2%, 2%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        'portfolio': '1400px',
      },
    },
  },
  plugins: [],
}

export default config
