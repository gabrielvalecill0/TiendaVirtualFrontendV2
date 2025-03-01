import { TestBed } from '@angular/core/testing';

import { UsuarioLocalStorageService } from './usuario-local-storage.service';

describe('UsuarioLocalStorageService', () => {
  let service: UsuarioLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
