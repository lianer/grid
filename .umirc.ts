export default {
  npmClient: 'pnpm',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  routes: [
    { path: '/', component: 'index' },
    { path: '/about', component: 'About' },
  ],
  title: 'Grid - Web Designer',
  metas: [
    { name: 'keywords', content: 'grid,designer,builder,design,build' },
    {
      name: 'description',
      content: 'A professional website designer for you project',
    },
  ],
};
