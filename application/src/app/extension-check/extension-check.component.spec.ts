import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionCheckComponent } from './extension-check.component';

describe('ExtensionCheckComponent', () => {
  let component: ExtensionCheckComponent;
  let fixture: ComponentFixture<ExtensionCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
