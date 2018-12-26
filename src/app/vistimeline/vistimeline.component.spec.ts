import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistimelineComponent } from './vistimeline.component';

describe('VistimelineComponent', () => {
  let component: VistimelineComponent;
  let fixture: ComponentFixture<VistimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
