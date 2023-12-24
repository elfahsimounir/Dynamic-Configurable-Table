import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoireItemComponent } from './avoire-item.component';

describe('AvoireItemComponent', () => {
  let component: AvoireItemComponent;
  let fixture: ComponentFixture<AvoireItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoireItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoireItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
