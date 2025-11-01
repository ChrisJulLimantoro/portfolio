import animate from 'tailwindcss-animate';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'], // Space Grotesk
        display: ['var(--font-display)', 'cursive'], // Caveat
      },
    },
  },
  plugins: [animate],
};
