/** interface for contact data */
export interface IContact {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    address: string;
    alternateNo?: string;
    id?: string;
}
/** interface for header names */
export interface IHeader {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    actions: string;
}

/** class to define empty contact */
export class Contact {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    address: string;
    alternateNo?: string;
    id?: string;
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.phoneNo = "";
        this.alternateNo = "";
        this.email = "";
        this.address = "";
    }
}
