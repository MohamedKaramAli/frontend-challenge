import { TestBed } from '@angular/core/testing';

import { GithubClientService } from './github-client.service';

describe('GithubClientService', () => {
  let service: GithubClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
