import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourbesComponent } from './courbes.component';

describe('CourbesComponent', () => {
  let component: CourbesComponent;
  let fixture: ComponentFixture<CourbesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourbesComponent]
    });
    fixture = TestBed.createComponent(CourbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
