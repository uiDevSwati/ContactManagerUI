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

    /** variable to hold email's validity
     * @memberof AddModifyContactsComponent
     */
    isEmailValid: boolean;

    /** variable to hold last name's validity
     * @memberof AddModifyContactsComponent
     */
    isLastNameValid: boolean;

    /** variable to hold last name's validity
     * @memberof AddModifyContactsComponent
     */
    isFirstNameValid: boolean;

    /** variable to hold error message
     * @memberof AddModifyContactsComponent
     */
    errorMessage: string;

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
        this.isEmailValid = true;
        this.isFirstNameValid = true;
        this.isLastNameValid = true;
        this.errorMessage = '';
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
        if (this.isEmailValid && this.isFirstNameValid && this.isLastNameValid && this.contact.phoneNo.toString().length > 10 && this.contact.phoneNo.toString().length < 16 && this.contact.email.length !== 0 && this.contact.firstName.length >= 3 && this.contact.lastName.length >= 3) {
            this.errorMessage = '';
            if (this.mode === 'modify') {
                this.contactService.updateContactData(this.contact);
            } else {
                this.contactService.addContact(this.contact);
            }
            this.router.navigate(['home']);
        } else {
            this.errorMessage = "Please fill required details.";
        }
    }

    /** function to validate email
     * @memberof AddModifyContactsComponent
     */
    emailValidation(event) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isEmailValid = re.test(String(this.contact.email).toLowerCase());
    }

    /** function to validate name
     * @memberof AddModifyContactsComponent
     */
    nameValidation(event, type: string) {
        let re = /[^A-Za-z0-9\s]/g;
        if (type === "fName") {
            this.isFirstNameValid = (!re.test(String(event).toLowerCase()) && event.length >= 3);
        } else {
            this.isLastNameValid = !re.test(String(event).toLowerCase()) && event.length >= 3;
        }
    }
}
