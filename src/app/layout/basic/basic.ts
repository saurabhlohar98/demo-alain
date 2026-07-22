import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { HeaderSearch } from './widgets/search';
import { HeaderUser } from './widgets/user';
import { AppSettingsComponent } from '../../shared/settings/app-settings/app-settings';

@Component({
  selector: 'layout-basic',
  standalone: true,
  template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl" [customError]="null">
      <!-- Left -->
      <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//github.com/ng-alain/ng-alain" target="_blank">
          <nz-icon nzType="github" />
        </a>
      </layout-default-header-item>

      <layout-default-header-item direction="left" hidden="mobile">
        <a layout-default-header-item-trigger routerLink="/passport/lock">
          <nz-icon nzType="lock" />
        </a>
      </layout-default-header-item>

      <layout-default-header-item direction="left" hidden="pc">
        <div layout-default-header-item-trigger (click)="searchToggleStatus.set(!searchToggleStatus())">
          <nz-icon nzType="search" />
        </div>
      </layout-default-header-item>

      <!-- Search -->
      <layout-default-header-item direction="middle">
        <header-search [(toggleChange)]="searchToggleStatus" />
      </layout-default-header-item>

      <!-- Settings -->
      <!-- Settings -->
      <layout-default-header-item direction="right" hidden="mobile">
        <a layout-default-header-item-trigger (click)="openSettings()">
          <nz-icon nzType="setting" />
        </a>
      </layout-default-header-item>
      <!-- User -->
      <layout-default-header-item direction="right">
        <header-user />
      </layout-default-header-item>

      <!-- Aside User -->
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
          <nz-avatar class="alain-default__aside-user-avatar" [nzSrc]="user.avatar" />

          <div class="alain-default__aside-user-info">
            <strong>{{ user.name }}</strong>
            <p class="mb0">{{ user.email }}</p>
          </div>
        </div>

        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/pro/account/center"> Account Center </li>

            <li nz-menu-item routerLink="/pro/account/settings"> Account Settings </li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>

      <!-- Page Content -->
      <ng-template #contentTpl>
        <router-outlet />
      </ng-template>
    </layout-default>
  `,
  imports: [
    RouterOutlet,
    RouterLink,
    LayoutDefaultModule,

    NzIconModule,
    NzMenuModule,
    NzDropdownModule,
    NzAvatarModule,
    HeaderSearch,
    HeaderUser
  ]
})
export class LayoutBasic {
  readonly user = inject(SettingsService).user;

  private drawer = inject(NzDrawerService);

  protected options: LayoutDefaultOptions = {
    logoExpanded: './assets/logo-full.svg',
    logoCollapsed: './assets/logo.svg'
  };

  protected searchToggleStatus = signal(false);

  protected showSettingDrawer = !environment.production;

  openSettings(): void {
    this.drawer.create({
      nzTitle: 'Application Settings',
      nzContent: AppSettingsComponent,
      nzWidth: 380
    });
  }
}
