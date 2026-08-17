import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { TalabaComponent } from './talaba.component';

describe('TalabaComponent', () => {
  let component: TalabaComponent;
  let fixture: ComponentFixture<TalabaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [TalabaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalabaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});
