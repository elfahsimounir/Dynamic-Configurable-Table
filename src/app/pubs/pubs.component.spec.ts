import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubsComponent } from './pubs.component';

describe('PubsComponent', () => {
  let component: PubsComponent;
  let fixture: ComponentFixture<PubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
