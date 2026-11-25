import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsFeatures } from './cards-features';

describe('CardsFeatures', () => {
  let component: CardsFeatures;
  let fixture: ComponentFixture<CardsFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
