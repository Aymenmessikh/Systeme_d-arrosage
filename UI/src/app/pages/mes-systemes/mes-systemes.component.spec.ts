import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSystemesComponent } from './mes-systemes.component';

describe('MesSystemesComponent', () => {
  let component: MesSystemesComponent;
  let fixture: ComponentFixture<MesSystemesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesSystemesComponent]
    });
    fixture = TestBed.createComponent(MesSystemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
