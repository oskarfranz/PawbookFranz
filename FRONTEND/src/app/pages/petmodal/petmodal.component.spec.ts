import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetmodalComponent } from './petmodal.component';

describe('PetmodalComponent', () => {
  let component: PetmodalComponent;
  let fixture: ComponentFixture<PetmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
