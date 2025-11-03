import { Component, Inject, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'custom-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  @Input() private hostComponent!: any;
  
  constructor() {}

  get previewUrl(): string | undefined {
    //console.log(this.hostComponent.searchResult['@id']);
    return this.hostComponent?.searchResult?.['@id'];
  }

  openPreview(): void {
    const url = this.previewUrl;
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener');
  }
}
