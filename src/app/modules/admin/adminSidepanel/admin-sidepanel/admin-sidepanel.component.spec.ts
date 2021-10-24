import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidepanelComponent } from './admin-sidepanel.component';

describe('AdminSidepanelComponent', () => {
  let component: AdminSidepanelComponent;
  let fixture: ComponentFixture<AdminSidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSidepanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
