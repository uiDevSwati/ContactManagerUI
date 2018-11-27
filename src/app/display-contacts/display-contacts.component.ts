import { Component, OnInit } from '@angular/core';
import { IHeader, IContact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-display-contacts',
    templateUrl: './display-contacts.component.html',
    styleUrls: ['./display-contacts.component.scss']
})
export class DisplayContactsComponent implements OnInit {

    /** varibale to hold header details
     * @memberof DisplayContactsComponent
     */
    headers: IHeader;

    /**
     * message when no data
     * @memberof DisplayContactsComponent
     */
    emptyTableMessage: string;

    /**
     * stores contact data
     * @memberof DisplayContactsComponent
     */
    contactData: IContact[];

    /**
     * initializes class attributes
     * @param contactService: ContactsService
     * @param router: Router
     * @memberof DisplayContactsComponent
     */
    constructor(private contactService: ContactsService, private router: Router) {
        this.headers = {
            firstName: 'First Name',
            lastName: 'Last Name',
            phoneNo: 'Contact Number',
            email: 'Email id',
            actions: 'Actions'
        };
        this.emptyTableMessage = '';
        this.contactData = [];
    }

    /**
     * initializes component
     * @memberof DisplayContactsComponent
     */
    ngOnInit() {
        this.contactData = this.contactService.getData();
        if (!this.contactData || (this.contactData && this.contactData.length === 0)) {
            this.contactService.getContactSummaryData().subscribe(res => {
                this.contactData = res;
                this.contactService.setData(this.contactData);
            });
        }
        if (!this.contactData || this.contactData.length === 0) {
            this.emptyTableMessage = 'No Data Found';
        }
    }

    /** function to route to add flow
     * @param param: string
     * @param id: string
     * @memberof DisplayContactsComponent
     */
    addContact(param: string, id?: string) {
        this.contactService.mode = param;
        if (!id) {
            this.router.navigate([param]);
        } else {
            this.router.navigate([param + '/' + id]);
        }
    }

    /** function to delete contact
     * @param id: string
     * @memberof DisplayContactsComponent
     */
    delete(id: string) {
        this.contactData = this.contactService.deleteContact(id);
    }
}
