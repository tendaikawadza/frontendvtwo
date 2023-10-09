import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeadProcurementAuthorisationComponent } from './new-head-procurement-authorisation.component';

describe('NewHeadProcurementAuthorisationComponent', () => {
  let component: NewHeadProcurementAuthorisationComponent;
  let fixture: ComponentFixture<NewHeadProcurementAuthorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHeadProcurementAuthorisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHeadProcurementAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
