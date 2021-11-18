import { TestBed } from '@angular/core/testing';

import { TodoItemsHttpConnectionService } from './todo-items-http-connection.service';

describe('TodoItemsHttpConnectionService', () => {
  let service: TodoItemsHttpConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemsHttpConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
