import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JardiniersComponent } from './jardiniers.component';

describe('JardiniersComponent', () => {
  let component: JardiniersComponent;
  let fixture: ComponentFixture<JardiniersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JardiniersComponent]
    });
    fixture = TestBed.createComponent(JardiniersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
