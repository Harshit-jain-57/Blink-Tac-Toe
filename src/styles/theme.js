export const theme = {
  colors: {
    hotPink: '#FF1493',
    springGreen: '#00FF7F',
    dodgerBlue: '#1E90FF',
    darkOrange: '#FF8C00',
    darkSlateGray: '#2F4F4F',
    white: '#FFFFFF',
    black: '#000000',
  },
  shadows: {
    glow: '0 0 10px',
    neon: '0 0 20px',
    intense: '0 0 30px',
    text: '0 0 5px',
  },
  gradients: {
    background: 'radial-gradient(circle at center, #FF1493 0%, #2F4F4F 100%)',
    neonGrid: 'linear-gradient(0deg, rgba(30, 144, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 144, 255, 0.1) 1px, transparent 1px)',
    button: 'linear-gradient(45deg, #1E90FF, #00FF7F)',
    glow: 'linear-gradient(45deg, #FF1493, #1E90FF)',
  },
  transitions: {
    default: 'all 0.3s ease',
    glow: 'all 0.5s ease',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  animations: {
    pulse: `
      @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 20px #FF1493; }
        50% { transform: scale(1.05); box-shadow: 0 0 30px #00FF7F; }
        100% { transform: scale(1); box-shadow: 0 0 20px #FF1493; }
      }
    `,
    float: `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `,
    glow: `
      @keyframes glow {
        0% { box-shadow: 0 0 5px #1E90FF; }
        50% { box-shadow: 0 0 20px #00FF7F; }
        100% { box-shadow: 0 0 5px #1E90FF; }
      }
    `,
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    fadeOut: `
      @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
      }
    `,
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  typography: {
    fontFamily: "'Orbitron', sans-serif",
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
}; 