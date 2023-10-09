import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadProcurementAuthorisationsComponent } from './head-procurement-authorisations.component';

describe('HeadProcurementAuthorisationsComponent', () => {
  let component: HeadProcurementAuthorisationsComponent;
  let fixture: ComponentFixture<HeadProcurementAuthorisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadProcurementAuthorisationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadProcurementAuthorisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
