import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontantComponent } from './montant.component';

describe('MontantComponent', () => {
  let component: MontantComponent;
  let fixture: ComponentFixture<MontantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MontantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
