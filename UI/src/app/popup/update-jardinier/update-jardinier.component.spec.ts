import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJardinierComponent } from './update-jardinier.component';

describe('UpdateJardinierComponent', () => {
  let component: UpdateJardinierComponent;
  let fixture: ComponentFixture<UpdateJardinierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateJardinierComponent]
    });
    fixture = TestBed.createComponent(UpdateJardinierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
