import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContactsComponent } from './display-contacts.component';

describe('DisplayContactsComponent', () => {
  let component: DisplayContactsComponent;
  let fixture: ComponentFixture<DisplayContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
