import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../models/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzCardModule,
    NzStatisticModule,
    NzInputModule,
    NzAvatarModule,
    NzIconModule,
    NzTooltipModule,
    NzSelectModule,
    NzModalModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  companies: string[] = [];

  searchText = '';

  selectedStatus = '';
  selectedCompany = '';

  constructor(
    private contactService: ContactService,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();

    this.searchText = '';
    this.selectedStatus = '';
    this.selectedCompany = '';

    this.companies = [...new Set(this.contacts.map(c => c.company).filter(Boolean))];

    this.filteredContacts = [...this.contacts];
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();

    this.filteredContacts = this.contacts.filter(contact => {
      const matchesSearch =
        !search ||
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.mobile.toLowerCase().includes(search) ||
        contact.company.toLowerCase().includes(search);

      const matchesStatus = !this.selectedStatus || contact.status === this.selectedStatus;

      const matchesCompany = !this.selectedCompany || contact.company === this.selectedCompany;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }

  get totalContacts(): number {
    return this.contacts.length;
  }

  get activeContacts(): number {
    return this.contacts.filter(c => c.status === 'Active').length;
  }

  get inactiveContacts(): number {
    return this.contacts.filter(c => c.status === 'Inactive').length;
  }

  get companyCount(): number {
    return new Set(this.contacts.map(c => c.company)).size;
  }

  openAddModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Add Contact',
      nzContent: ContactFormComponent,
      nzWidth: 900,
      nzFooter: null,
      nzMaskClosable: false
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.loadContacts();
        this.applyFilters();
        this.cdr.detectChanges();
      }
    });
  }

  openEditModal(contact: Contact): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Contact',
      nzContent: ContactFormComponent,
      nzWidth: 900,
      nzFooter: null,
      nzMaskClosable: false,
      nzData: {
        contact
      }
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.loadContacts();
        this.applyFilters();
        this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this contact?');

    if (!confirmed) {
      return;
    }

    this.contactService.deleteContact(id);
    this.loadContacts();
  }
}
