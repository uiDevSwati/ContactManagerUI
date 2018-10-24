import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IContact, Contact } from './contact.model';
import { Observable, observable } from 'rxjs';

let headers1 = new HttpHeaders();
headers1.append('Content-Type', 'text');

/** service for making data calls */
@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    /**variable used for holding data
     * @memberof ContactsService
     */
    contactData: IContact[];

    /**variable to hold app mode
     * @memberof ContactsService
     */
    mode: string;

    /** used to initialize class attributes
     * @param httpService: HttpClient
     * @memberof ContactsService
     */
    constructor(private httpService: HttpClient) {
        this.contactData = [];
        this.mode = 'add';
    }

    /** used to add data to local storage
     * @param contact: IContact
     * @memberof ContactsService
     */
    addContact(contact: IContact) {
        if (!this.contactData) {
            this.contactData = [];
        }
        const id = contact.firstName[0] + contact.lastName[0] + (Number(contact.phoneNo) + 1);
        for (let i = 0; ; i++) {
            if (!localStorage.getItem(id)) {
                contact.id = id;
                break;
            } else {
                contact.id = id + 1;
            }
        }
        this.contactData.push(contact);
        localStorage.setItem('contacts', JSON.stringify(this.contactData));
    }

    /** used to delete data from local storage
     * @param id: string
     * @returns IContact array
     * @memberof ContactsService
     */
    deleteContact(id: string): IContact[] {
        for (let i = 0; i < this.contactData.length; i++) {
            if (this.contactData[i].id === id) {
                this.contactData.splice(i, 1);
            }
        }
        localStorage.setItem('contacts', JSON.stringify(this.contactData));
        return this.contactData;
    }
    /** used to get data from local storage
     * @param id: string
     * @returns IContact
     * @memberof ContactsService
     */
    getContactData(id: string): IContact {
        let data: IContact;
        data = new Contact();
        this.contactData = JSON.parse(localStorage.getItem('contacts'));
        if (localStorage.getItem('contacts')) {
            for (let i = 0; i < this.contactData.length; i++) {
                if (this.contactData[i].id === id) {
                    data = this.contactData[i];
                }
            }
        }
        return data;
    }

    /** used to update data
     * @m=param data: IContact
     * @memberof ContactsService
     */
    updateContactData(data: IContact) {
        for (let i = 0; i < this.contactData.length; i++) {
            if (this.contactData[i].id === data.id) {
                this.contactData[i] = { ...data };
            }
        }
        localStorage.setItem('contacts', JSON.stringify(this.contactData));
    }

    /**
     * function to get all summary details
     * @returns observable of IContact
     * @memberof ContactsService
     */
    getContactSummaryData(): Observable<IContact[]> {
        return this.httpService.get<IContact[]>('src/app/data/detail-data.json');
    }

    /** function to get data from local storage
     * @param data: IContact[]
     * @memberof ContactsService
     */
    setData(data: IContact[]) {
        this.contactData = data;
        localStorage.setItem('contacts', JSON.stringify(this.contactData));
    }

    /** function to get data from local storage
     * @returns contact data
     * @memberof ContactsService
     */
    getData(): IContact[] {
        this.contactData = JSON.parse(localStorage.getItem('contacts'));
        return this.contactData;
    }
}
