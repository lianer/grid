export default {
  npmClient: 'pnpm',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  routes: [
    { path: '/', component: 'index' },
    { path: '/about', component: 'About' },
  ],
};
