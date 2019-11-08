import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBookComponent } from './details.component';

describe('AboutBookComponent', () => {
  let component: AboutBookComponent;
  let fixture: ComponentFixture<AboutBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
