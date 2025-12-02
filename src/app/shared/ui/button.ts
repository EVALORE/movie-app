import { Directive } from '@angular/core';

@Directive({
  selector: '[appButton]',
  host: {
    class:
      'p-2 rounded-lg dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
  },
})
export class Button {}
