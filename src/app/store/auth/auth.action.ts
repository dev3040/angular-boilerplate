const namespace = '[Auth]';
export interface Email {
    userEmail: string
}

export class Login {
    static readonly type = `${namespace} login`;

    constructor(public form: any) {
    }
}

export class Register {
    static readonly type = `${namespace} register`;

    constructor(public form: any){
    }
}

export class ForgotPassword {
    static readonly type = `${namespace} forgot password`

    constructor(public email: string){
    }
}

export class ResetPassword {
    static readonly type = `${namespace} set new password`

    constructor(public form: any){
    }
} 

export class GetUser{
    static readonly type = `${namespace} Get User`
}

export class GetComments{
    static readonly type = `${namespace} Get User`
}

export class UpdateUser {
    static readonly type = `${namespace} Update User`

    constructor(public form: any){
    }
}

