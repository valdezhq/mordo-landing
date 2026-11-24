import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowFeatures } from './row-features';

describe('RowFeatures', () => {
  let component: RowFeatures;
  let fixture: ComponentFixture<RowFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(RowFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
