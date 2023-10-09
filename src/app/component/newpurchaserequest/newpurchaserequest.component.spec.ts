import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchaserequestComponent } from './newpurchaserequest.component';

describe('NewpurchaserequestComponent', () => {
  let component: NewpurchaserequestComponent;
  let fixture: ComponentFixture<NewpurchaserequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpurchaserequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
