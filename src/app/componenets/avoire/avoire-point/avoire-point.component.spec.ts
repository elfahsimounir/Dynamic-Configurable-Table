import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoirePointComponent } from './avoire-point.component';

describe('AvoirePointComponent', () => {
  let component: AvoirePointComponent;
  let fixture: ComponentFixture<AvoirePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoirePointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoirePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
