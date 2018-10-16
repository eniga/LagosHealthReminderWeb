import { Injectable } from "@angular/core";

@Injectable()

export class UsersModel {
    userId: number;
    username: string;
    password: string;
    displayName: string;
    email: string;
    insertUserId: number;
    insertUser: string;
    insertDate: Date;
    updateUserId: number;
    updateUser: string;
    updateDate: Date;
    userRoleId: number;
    roleId: number;
    roleName: string;
    isActive: number;
}

export class LoginUserModel {
    username: string;
    password: string;
}