import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { ThemeMode } from '../models/theme.model';
import { AppThemeService } from '../services/app-theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, NzRadioModule],
  templateUrl: './app-settings.html',
  styleUrls: ['./app-settings.less']
})
export class AppSettingsComponent {
  private themeService = inject(AppThemeService);

  theme: ThemeMode = this.themeService.currentTheme;

  changeTheme(mode: ThemeMode): void {
    this.theme = mode;
    this.themeService.setTheme(mode);
  }
}
