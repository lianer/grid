// 配置 prettier plugins 导致 prettier-vscode 不起作用的问题
// https://github.com/umijs/umi/issues/8182

module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  overrides: [{ files: '.prettierrc.js', options: { parser: 'json' } }],
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
};
