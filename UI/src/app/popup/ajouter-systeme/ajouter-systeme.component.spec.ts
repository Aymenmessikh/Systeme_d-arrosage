import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSystemeComponent } from './ajouter-systeme.component';

describe('AjouterSystemeComponent', () => {
  let component: AjouterSystemeComponent;
  let fixture: ComponentFixture<AjouterSystemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSystemeComponent]
    });
    fixture = TestBed.createComponent(AjouterSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
