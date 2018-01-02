export class User {
    static readonly SUPERUSER :number = 1;
    static readonly ADMIN :number = 2;

    id: number;
    name: string;
    email: string;
    role: number;
    createdAt: Date;

    isSuperUser() {
        return (this.role === User.SUPERUSER);
    }

    isAdmin() {
        return (this.role === User.ADMIN);
    }
}