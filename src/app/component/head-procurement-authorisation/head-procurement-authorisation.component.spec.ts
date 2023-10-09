import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadProcurementAuthorisationComponent } from './head-procurement-authorisation.component';

describe('HeadProcurementAuthorisationComponent', () => {
  let component: HeadProcurementAuthorisationComponent;
  let fixture: ComponentFixture<HeadProcurementAuthorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadProcurementAuthorisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadProcurementAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
