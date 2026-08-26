/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyanBrand: '#1CA7E0',
        bg: '#080A0B',
        ink: '#0D0D0D',
        surface: '#101315',
        surface2: '#161A1D',
        paper: '#F4F6F7',
        charcoal: '#1A1A1A',
        steel: '#68727A',
        muted: '#929AA0',
        graphite: '#252A2D',
        caution: '#E2A63B',
        line: 'rgba(255,255,255,0.11)'
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        cyan: '0 0 44px rgba(28, 167, 224, 0.20)',
        steel: '0 28px 90px rgba(3, 8, 12, 0.34)',
        soft: '0 24px 80px rgba(11, 15, 18, 0.12)'
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(28,167,224,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,167,224,0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
