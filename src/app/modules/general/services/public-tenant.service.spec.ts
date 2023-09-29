import { TestBed } from '@angular/core/testing';

import { PublicTenantService } from './public-tenant.service';

describe('PublicTenantService', () => {
  let service: PublicTenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicTenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
