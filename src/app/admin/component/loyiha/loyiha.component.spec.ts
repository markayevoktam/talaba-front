import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { LoyihaComponent } from './loyiha.component';

describe('LoyihaComponent', () => {
  let component: LoyihaComponent;
  let fixture: ComponentFixture<LoyihaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [LoyihaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyihaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});
