import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { IContact, Contact } from '../contact.model';

@Component({
    selector: 'app-add-modify-contacts',
    templateUrl: './add-modify-contacts.component.html',
    styleUrls: ['./add-modify-contacts.component.scss']
})
export class AddModifyContactsComponent implements OnInit {

    /** variable to hold page heading
     * @memberof AddModifyContactsComponent
     */
    pageHeading: string;

    /** variable for button label
     * @memberof AddModifyContactsComponent
     */
    saveButton: string;

    /** variable to tell if add/edit/view mode
     * @memberof AddModifyContactsComponent
     */
    mode: string;

    /** variable to tell if data is loaded
     * @memberof AddModifyContactsComponent
     */
    dataLoaded: boolean;

    /** variable for cancel button label
     * @memberof AddModifyContactsComponent
     */
    cancelButton: string;

    /** variable to hold contact data
     * @memberof AddModifyContactsComponent
     */
    contact: IContact;

    /**contructor initializes class attributes
     * @memberof AddModifyContactsComponent
     * @param activatedRoute: ActivatedRoute
     * @param contactService: ContactsService
     * @param router: Router
     */
    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactsService, private router: Router) {
        this.pageHeading = 'Add Contact';
        this.saveButton = 'Add Contact';
        this.contact = new Contact();
        this.dataLoaded = false;
        this.cancelButton = 'Cancel';
    }

    /** initializes component
     * @memberof AddModifyContactsComponent
     */
    ngOnInit() {
        this.mode = this.contactService.mode;
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.contact = this.contactService.getContactData(params.id);
                this.pageHeading = 'Modify Contact';
                this.saveButton = 'Update Contact';
            }
            this.dataLoaded = true;
        });
        if (this.mode === 'view') {
            this.cancelButton = 'Back';
            this.pageHeading = 'View Contact';
        }
    }

    /**cancel progress
     * @memberof AddModifyContactsComponent
     */
    cancel() {
        this.router.navigate(['home']);
    }

    /** function to save progress and reroute
     * @memberof AddModifyContactsComponent
     */
    save() {
        if (this.mode === 'modify') {
            this.contactService.updateContactData(this.contact);
        } else {
            this.contactService.addContact(this.contact);
        }
        this.router.navigate(['home']);
    }
}
