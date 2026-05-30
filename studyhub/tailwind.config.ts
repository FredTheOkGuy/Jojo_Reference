/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f2ede3',
        surface: '#faf8f4',
        surface2: '#edeae2',
        surface3: '#e4e0d6',
        primary: '#c96332',
        'primary-lt': '#faeade',
        'primary-md': '#f0b897',
        'primary-dk': '#a34e24',
        accent: '#5a6e3a',
        'accent-lt': '#e8edda',
        accent2: '#3d5fa0',
        'accent2-lt': '#dde6f5',
        accent3: '#7a4fa0',
        'accent3-lt': '#ede0f7',
        accent4: '#8a6a1e',
        'accent4-lt': '#f7edcc',
        ink: '#1a1610',
        ink2: '#4a4438',
        ink3: '#9a9282',
        border: '#ddd8cc',
        border2: '#cec8bc',
      },
      borderRadius: {
        '5xl': '20px',
        '3.5': '14px',
      },
      spacing: {
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '6.5': '1.625rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        sm: '0 1px 8px rgba(26,22,16,.07)',
        md: '0 4px 20px rgba(26,22,16,.10)',
      },
      keyframes: {
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(8px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.28s ease',
      },
    },
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'sans-serif'],
      syne: ['Syne', 'sans-serif'],
      'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
