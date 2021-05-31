import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdriverComponent } from './basicdriver.component';

describe('BasicdriverComponent', () => {
  let component: BasicdriverComponent;
  let fixture: ComponentFixture<BasicdriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicdriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
