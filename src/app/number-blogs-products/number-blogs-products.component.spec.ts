import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberBlogsProductsComponent } from './number-blogs-products.component';

describe('NumberBlogsProductsComponent', () => {
  let component: NumberBlogsProductsComponent;
  let fixture: ComponentFixture<NumberBlogsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberBlogsProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberBlogsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
