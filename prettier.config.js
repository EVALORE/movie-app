import personalConfig from '@evalore/prettier-config';

export default {
  ...personalConfig,
  singleAttributePerLine: false,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
