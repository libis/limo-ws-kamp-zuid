import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  describe('when previewUrl is provided', () => {
    let component: PreviewComponent;
    let fixture: ComponentFixture<PreviewComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PreviewComponent],
        providers: [
          {
            provide: 'MODULE_PARAMETERS',
            useValue: { previewUrl: 'https://example.com/preview' },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PreviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.previewUrl).toBe('https://example.com/preview');
    });

    it('should render the enabled preview icon button', () => {
      const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('aria-label')).toBe('Preview');
      const icon = button?.querySelector('mat-icon');
      expect(icon?.textContent?.trim()).toBe('visibility');
      expect(button?.disabled).toBeFalse();
    });

    it('should open the preview URL in a new tab when clicked', () => {
      const openSpy = spyOn(window, 'open');
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      button.click();

      expect(openSpy).toHaveBeenCalledWith('https://example.com/preview', '_blank', 'noopener');
    });
  });

  describe('when previewUrl is missing', () => {
    let fixture: ComponentFixture<PreviewComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PreviewComponent],
        providers: [
          {
            provide: 'MODULE_PARAMETERS',
            useValue: {},
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PreviewComponent);
      fixture.detectChanges();
    });

    it('should disable the preview button', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBeTrue();
    });

    it('should not attempt to open a new tab when clicked', () => {
      const openSpy = spyOn(window, 'open');
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      button.click();

      expect(openSpy).not.toHaveBeenCalled();
    });
  });
});
