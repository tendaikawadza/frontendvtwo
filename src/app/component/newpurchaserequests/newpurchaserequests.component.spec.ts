import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchaserequestsComponent } from './newpurchaserequests.component';

describe('NewpurchaserequestsComponent', () => {
  let component: NewpurchaserequestsComponent;
  let fixture: ComponentFixture<NewpurchaserequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpurchaserequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpurchaserequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
