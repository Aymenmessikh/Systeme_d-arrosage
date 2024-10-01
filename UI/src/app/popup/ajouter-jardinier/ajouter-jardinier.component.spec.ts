import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterJardinierComponent } from './ajouter-jardinier.component';

describe('AjouterJardinierComponent', () => {
  let component: AjouterJardinierComponent;
  let fixture: ComponentFixture<AjouterJardinierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterJardinierComponent]
    });
    fixture = TestBed.createComponent(AjouterJardinierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
