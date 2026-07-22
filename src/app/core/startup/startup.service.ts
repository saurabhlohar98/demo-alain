import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, Provider, inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, of, catchError, map } from 'rxjs';

/**
 * Application startup service.
 * Loads the initial application data such as:
 * - Application settings
 * - Current user information
 * - Menu configuration
 * - Access permissions (ACL)
 */
export function provideStartup(): Array<Provider | EnvironmentProviders> {
  return [
    StartupService,
    provideAppInitializer(() => {
      const initializerFn = (
        (startupService: StartupService) => () =>
          startupService.load()
      )(inject(StartupService));
      return initializerFn();
    })
  ];
}

@Injectable()
export class StartupService {
  private menuService = inject(MenuService);
  private settingService = inject(SettingsService);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private aclService = inject(ACLService);
  private titleService = inject(TitleService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  // If http request allows anonymous access, you need to add `ALLOW_ANONYMOUS`:
  // this.httpClient.get('/app', { context: new HttpContext().set(ALLOW_ANONYMOUS, true) })
  private appData$ = this.httpClient.get('./assets/tmp/app-data.json').pipe(
    catchError((res: NzSafeAny) => {
      console.warn(`StartupService.load: Network request failed`, res);
      setTimeout(() => this.router.navigateByUrl(`/exception/500`));
      return of({});
    })
  );

  load(): Observable<void> {
    // http
    //  Mock: Do not use this in a production environment.
    // The viaMock method only simulates data so that the application can run normally during initial setup.
    return this.viaMock();
  }

  private handleAppData(res: NzSafeAny): void {
    // Configure application information (name, description, etc.)
    this.settingService.setApp(res.app);
    // Configure the current user information
    this.settingService.setUser(res.user);
    /// Grant full permissions for development.
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add(res.menu ?? []);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = res.app?.name;
  }

  private viaHttp(): Observable<void> {
    return this.appData$.pipe(map((res: NzSafeAny) => this.handleAppData(res)));
  }

  private viaMock(): Observable<void> {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.router.navigateByUrl(this.tokenService.login_url!);
    //   return;
    // }
    // mock
    const app: any = {
      name: `NG-ALAIN`,
      description: `NG-ZORRO admin panel front-end framework`
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'info@nextelus.com',
      token: '123456789'
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: 'Main',
        group: true,
        children: [
          {
            text: 'Dashboard',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          }
        ]
      }
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    return of(void 0);
  }
}
