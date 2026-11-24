import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridFeatures } from './grid-features';

describe('GridFeatures', () => {
  let component: GridFeatures;
  let fixture: ComponentFixture<GridFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(GridFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
