import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarProdutosModal } from './gerenciar-produtos-modal';

describe('GerenciarProdutosModal', () => {
  let component: GerenciarProdutosModal;
  let fixture: ComponentFixture<GerenciarProdutosModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarProdutosModal],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarProdutosModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
