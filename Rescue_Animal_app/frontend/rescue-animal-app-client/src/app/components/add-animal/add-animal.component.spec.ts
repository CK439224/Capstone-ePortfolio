import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAnimalComponent } from './add-animal.component';

/* Unit test suite for the AddAnimalComponent */
describe('AddAnimalComponent', () => {
  let component: AddAnimalComponent; // Component instance to be tested
  let fixture: ComponentFixture<AddAnimalComponent>; // Test fixture for the component

  beforeEach(async () => {
    /* Asynchronous setup before each test */
    await TestBed.configureTestingModule({
      imports: [AddAnimalComponent] // Importing the component for testing
    })
    .compileComponents(); // Compiles template and CSS

    /* Create the component fixture and instance */
    fixture = TestBed.createComponent(AddAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers Angular's change detection
  });

  /* Test to verify the component is created successfully */
  it('should create', () => {
    expect(component).toBeTruthy(); // Asserts that the component instance exists
  });
});
