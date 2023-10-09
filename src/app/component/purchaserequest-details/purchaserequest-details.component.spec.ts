import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserequestDetailsComponent } from './purchaserequest-details.component';

describe('PurchaserequestDetailsComponent', () => {
  let component: PurchaserequestDetailsComponent;
  let fixture: ComponentFixture<PurchaserequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaserequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaserequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
