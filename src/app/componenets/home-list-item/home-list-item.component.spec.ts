import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListItemComponent } from './home-list-item.component';

describe('HomeListItemComponent', () => {
  let component: HomeListItemComponent;
  let fixture: ComponentFixture<HomeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
