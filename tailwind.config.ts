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
        primary: '#0B201C',
        medium: '#3C5955',
        sage: '#B7C5C5',
        accent: '#22C55E',
      },
    },
  },
  plugins: [],
}

export default config
