import { NgComponentsNdikuService } from './ng-components-ndiku.service';

describe('NgComponentsNdikuService', () => {
  let service: NgComponentsNdikuService;

  beforeEach(() => {
    service = new NgComponentsNdikuService();
  });

  afterAll(() => {
    service.inputValueChanged$.unsubscribe();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should emit inputValueChanged$', () => {
    const value = 'TEST PASSED';
    service.inputValueChanged$.next(value);

    service.inputValueChanged$.subscribe((returned) => {
      expect(returned).toEqual(value);
    });
  });
});
