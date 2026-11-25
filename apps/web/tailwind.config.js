export default {
  theme: { extend: {
    keyframes: { bounceThree: {
      '0%, 100%': { transform: 'translateY(0)' },
      '20%, 50%, 80%': { transform: 'translateY(-10px)' },
      '40%, 60%': { transform: 'translateY(0)' },
    }, 'ad-bounce': {
      '0%, 20%, 40%, 60%, 90%, 100%': { transform: 'translateY(0)' },
      '10%': { transform: 'translateY(-24px)' },
      '30%': { transform: 'translateY(-12px)' },
      '50%': { transform: 'translateY(-6px)' },
    } },
    animation: { 'bounce-three': 'bounceThree 3s infinite ease-in-out', 'ad-bounce': 'ad-bounce 3s ease-in-out' },
  } },
}
