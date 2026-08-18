import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { YutuqComponent } from './yutuq.component';

describe('YutuqComponent', () => {
  let component: YutuqComponent;
  let fixture: ComponentFixture<YutuqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [YutuqComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YutuqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});
