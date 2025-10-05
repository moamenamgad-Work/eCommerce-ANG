import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPopularComponent } from './product-popular.component';

describe('ProductPopularComponent', () => {
  let component: ProductPopularComponent;
  let fixture: ComponentFixture<ProductPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPopularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
