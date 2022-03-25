module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-image': "url('./public/assets/images/corgi_sit.jpg')",
       },
      colors: {
        kLightGrey: '#C5C5C5',
        kWhiteDark: '#F4F4F4',
        kBlue:'#4971FF'
      },
    },
  },
  plugins: [],
};
