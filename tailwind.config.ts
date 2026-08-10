import animate from 'tailwindcss-animate';

const tailwindConfig = {
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
        editorial: ['var(--font-bricolage)', 'var(--font-sans)', 'sans-serif'], // Bricolage Grotesque
      },
    },
  },
  plugins: [animate],
};

export default tailwindConfig;
