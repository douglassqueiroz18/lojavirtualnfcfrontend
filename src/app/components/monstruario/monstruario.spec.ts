import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monstruario } from './monstruario';

describe('Monstruario', () => {
  let component: Monstruario;
  let fixture: ComponentFixture<Monstruario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monstruario],
    }).compileComponents();

    fixture = TestBed.createComponent(Monstruario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
