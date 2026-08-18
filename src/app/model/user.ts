export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  ism: string;
  familiya: string;
  login: string;
  parol: string;
  role: Role;
  regVaqt: Date;
  oxirgiTashrif: Date;
  rasm: any;
}
