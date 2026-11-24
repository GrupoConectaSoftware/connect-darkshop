export default {
  theme: { extend: {
    keyframes: { bounceThree: {
      '0%, 100%': { transform: 'translateY(0)' },
      '20%, 50%, 80%': { transform: 'translateY(-10px)' },
      '40%, 60%': { transform: 'translateY(0)' },
    } },
    animation: { 'bounce-three': 'bounceThree 3s infinite ease-in-out' },
  } },
}
