import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemesComponent } from './systemes.component';

describe('SystemesComponent', () => {
  let component: SystemesComponent;
  let fixture: ComponentFixture<SystemesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemesComponent]
    });
    fixture = TestBed.createComponent(SystemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
