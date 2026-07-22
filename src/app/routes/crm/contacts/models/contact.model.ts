export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  status: 'Active' | 'Inactive';
}
