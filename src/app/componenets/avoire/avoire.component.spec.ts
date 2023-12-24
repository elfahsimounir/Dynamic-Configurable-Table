import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoireComponent } from './avoire.component';

describe('AvoireComponent', () => {
  let component: AvoireComponent;
  let fixture: ComponentFixture<AvoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
