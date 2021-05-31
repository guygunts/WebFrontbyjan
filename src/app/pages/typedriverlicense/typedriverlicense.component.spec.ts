import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedriverlicenseComponent } from './typedriverlicense.component';

describe('TypedriverlicenseComponent', () => {
  let component: TypedriverlicenseComponent;
  let fixture: ComponentFixture<TypedriverlicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypedriverlicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedriverlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
