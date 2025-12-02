import { Injectable } from '@angular/core';
import { ThemeToken } from '../../tokens/theme-token';
import { StorageService } from './storage-abstract';

export interface LocalStorageState {
  theme: ThemeToken;
}

@Injectable({
  providedIn: 'root',
  useFactory: () => new LocalStorageService(localStorage, 'movie'),
})
export class LocalStorageService extends StorageService<LocalStorageState> {}
