import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the preview icon button', () => {
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Preview');
    const icon = button?.querySelector('mat-icon');
    expect(icon?.textContent?.trim()).toBe('visibility');
  });
});
