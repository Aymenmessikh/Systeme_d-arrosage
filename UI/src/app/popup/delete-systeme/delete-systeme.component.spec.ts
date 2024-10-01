import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSystemeComponent } from './delete-systeme.component';

describe('DeleteSystemeComponent', () => {
  let component: DeleteSystemeComponent;
  let fixture: ComponentFixture<DeleteSystemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSystemeComponent]
    });
    fixture = TestBed.createComponent(DeleteSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
