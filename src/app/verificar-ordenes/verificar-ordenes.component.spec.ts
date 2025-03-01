import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarOrdenesComponent } from './verificar-ordenes.component';

describe('VerificarOrdenesComponent', () => {
  let component: VerificarOrdenesComponent;
  let fixture: ComponentFixture<VerificarOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificarOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
