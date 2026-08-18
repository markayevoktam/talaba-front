import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { YunalishComponent } from './yunalish.component';

describe('YunalishComponent', () => {
  let component: YunalishComponent;
  let fixture: ComponentFixture<YunalishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [YunalishComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YunalishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});
