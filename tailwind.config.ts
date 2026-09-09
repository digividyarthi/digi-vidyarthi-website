import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1149C6',
          'blue-dark': '#0D3A9E',
          'blue-light': '#3366DB',
          'blue-pale': '#E8EEFB',
          orange: '#E65100',
          'orange-dark': '#C43E00',
          'orange-light': '#FF8A3D',
          'orange-pale': '#FFF3E0',
        },
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        glow: '0 10px 30px rgba(17, 73, 198, 0.15)',
        orangeGlow: '0 10px 30px rgba(230, 81, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
