import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpetComponent } from './newpet.component';

describe('NewpetComponent', () => {
  let component: NewpetComponent;
  let fixture: ComponentFixture<NewpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
