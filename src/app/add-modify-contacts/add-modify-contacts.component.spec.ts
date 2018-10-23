import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyContactsComponent } from './add-modify-contacts.component';

describe('AddModifyContactsComponent', () => {
  let component: AddModifyContactsComponent;
  let fixture: ComponentFixture<AddModifyContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModifyContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
