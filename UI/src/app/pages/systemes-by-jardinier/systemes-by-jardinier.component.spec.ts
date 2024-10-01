import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemesByJardinierComponent } from './systemes-by-jardinier.component';

describe('SystemesByJardinierComponent', () => {
  let component: SystemesByJardinierComponent;
  let fixture: ComponentFixture<SystemesByJardinierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemesByJardinierComponent]
    });
    fixture = TestBed.createComponent(SystemesByJardinierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
