import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { Contact } from '../models/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less'],
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule]
})
export class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  private contactService = inject(ContactService);
  private cdr = inject(ChangeDetectorRef);

  data = inject(NZ_MODAL_DATA) as {
    contact?: Contact;
  };

  isEdit = false;

  contactForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    company: [''],
    status: ['Active' as 'Active' | 'Inactive']
  });

  ngOnInit(): void {
    if (this.data.contact) {
      this.isEdit = true;
      this.contactForm.patchValue(this.data.contact);
    }

    // this.cdr.detectChanges();
  }

  save(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value: Contact = {
      id: this.isEdit ? this.data.contact!.id : Date.now(),
      ...this.contactForm.getRawValue()
    };

    if (this.isEdit) {
      this.contactService.updateContact(value);
    } else {
      this.contactService.addContact(value);
    }

    this.modalRef.close(true);
  }

  cancel(): void {
    this.modalRef.close();
  }
}
