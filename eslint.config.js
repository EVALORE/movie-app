import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import { configs } from '@evalore/eslint-config';

export default tseslint.config(
  configs.js,
  configs.ts,
  {
    files: ["**/*.ts"],
    extends: [
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
   files: ['**/*.ts', '**/*.js'],
   rules: {
     'consistent-return': 'off'
   }
  }
)
