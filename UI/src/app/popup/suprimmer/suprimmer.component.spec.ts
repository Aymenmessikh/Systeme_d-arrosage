import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprimmerComponent } from './suprimmer.component';

describe('SuprimmerComponent', () => {
  let component: SuprimmerComponent;
  let fixture: ComponentFixture<SuprimmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuprimmerComponent]
    });
    fixture = TestBed.createComponent(SuprimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
