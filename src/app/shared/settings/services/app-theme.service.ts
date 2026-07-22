import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ThemeMode } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {
  private readonly STORAGE_KEY = 'erp-theme';

  private themeSubject = new BehaviorSubject<ThemeMode>('light');

  readonly theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  get currentTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  setTheme(mode: ThemeMode): void {
    this.themeSubject.next(mode);

    localStorage.setItem(this.STORAGE_KEY, mode);

    document.documentElement.setAttribute('data-theme', mode);
  }

  private loadTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;

    if (saved === 'light' || saved === 'dark') {
      this.setTheme(saved);
    } else {
      this.setTheme('light');
    }
  }
}
