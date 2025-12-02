import { InjectionToken, signal, WritableSignal } from '@angular/core';

export const MOVIES_SEARCH = new InjectionToken('MOVIES_SEARCH', {
  providedIn: 'root',
  factory: (): WritableSignal<string> => signal(''),
});
