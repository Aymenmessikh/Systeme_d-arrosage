import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSystemeComponent } from './update-systeme.component';

describe('UpdateSystemeComponent', () => {
  let component: UpdateSystemeComponent;
  let fixture: ComponentFixture<UpdateSystemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSystemeComponent]
    });
    fixture = TestBed.createComponent(UpdateSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
