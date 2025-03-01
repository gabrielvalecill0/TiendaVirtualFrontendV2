import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarOrdenComponent } from './realizar-orden.component';

describe('RealizarOrdenComponent', () => {
  let component: RealizarOrdenComponent;
  let fixture: ComponentFixture<RealizarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizarOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
