import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { GuruhComponent } from './guruh.component';

describe('GuruhComponent', () => {
  let component: GuruhComponent;
  let fixture: ComponentFixture<GuruhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [GuruhComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuruhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});
