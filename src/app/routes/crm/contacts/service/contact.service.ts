import { Injectable } from '@angular/core';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly STORAGE_KEY = 'contacts';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const contacts = localStorage.getItem(this.STORAGE_KEY);

    if (!contacts) {
      const sampleContacts: Contact[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          mobile: '9876543210',
          company: 'ABC Pvt Ltd',
          status: 'Active'
        },
        {
          id: 2,
          firstName: 'Emma',
          lastName: 'Brown',
          email: 'emma@example.com',
          mobile: '9876543211',
          company: 'XYZ Ltd',
          status: 'Active'
        },
        {
          id: 3,
          firstName: 'David',
          lastName: 'Lee',
          email: 'david@example.com',
          mobile: '9876543212',
          company: 'Google',
          status: 'Inactive'
        }
      ];

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleContacts));
    }
  }

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  getContactById(id: number): Contact | undefined {
    return this.getContacts().find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts().map(contact => (contact.id === updatedContact.id ? updatedContact : contact));

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  deleteContact(id: number): void {
    const contacts = this.getContacts().filter(contact => contact.id !== id);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }
}
