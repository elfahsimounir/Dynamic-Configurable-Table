import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoireKeyboardComponent } from './avoire-keyboard.component';

describe('AvoireKeyboardComponent', () => {
  let component: AvoireKeyboardComponent;
  let fixture: ComponentFixture<AvoireKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoireKeyboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoireKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
