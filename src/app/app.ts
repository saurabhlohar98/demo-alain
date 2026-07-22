import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN, stepPreloader } from '@delon/theme';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
  host: {
    '[attr.ng-alain-version]': 'ngAlainVersion',
    '[attr.ng-zorro-version]': 'ngZorroVersion'
  }
})
export class App {
  private readonly router = inject(Router);
  private readonly titleSrv = inject(TitleService);
  private readonly modalSrv = inject(NzModalService);
  protected ngAlainVersion = VERSION_ALAIN.full;
  protected ngZorroVersion = VERSION_ZORRO.full;

  private donePreloader = stepPreloader();

  constructor() {
    let configLoad = false;
    this.router.events.subscribe(ev => {
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }
      if (configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: `Remainder`,
          nzContent: environment.production
            ? `Application may have a new version, please click refresh to take effect.`
            : `Failed to load route: ${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: 'Refresh',
          nzCancelText: 'Ignore',
          nzOnOk: () => location.reload()
        });
      }
      if (ev instanceof NavigationEnd) {
        this.donePreloader();
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      }
    });
  }
}
