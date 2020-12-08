import { TestBed } from '@angular/core/testing';

import { TabsManagementService } from './tabs-management.service';

describe('TabsManagementService', () => {
  let service: TabsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
