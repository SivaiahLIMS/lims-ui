export interface AppUser {
  id: number; username: string; fullName: string; email: string;
  phone?: string; department?: string; status: string; tenantId: number;
  roles: string[]; createdAt: string;
}
