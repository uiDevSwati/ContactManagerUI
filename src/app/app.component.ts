import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';
import { IContact } from './contact.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * holds page title
     * @memberof AppComponent
     */
    title = 'Contact Management!';
    /**
     * initializes class attributes
     * @param contactService ContactService
     */
    constructor(private contactService: ContactsService) {
    }
}
