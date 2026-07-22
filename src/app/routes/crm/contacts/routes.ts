import { Routes } from '@angular/router';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: 'add',
    component: ContactFormComponent
  },
  {
    path: 'edit/:id',
    component: ContactFormComponent
  }
];
