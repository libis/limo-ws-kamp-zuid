import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'custom-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  @Input() private hostComponent!: any;
  private httpClient: HttpClient = inject(HttpClient);

  private id: string | undefined;
  public previewUrl = 'https://example.com/preview/';

  ngOnInit() {
    this.id = this.hostComponent?.searchResult?.['@id'].split('/').pop();
  }

  openPreview(): void {
    this.httpClient
      .get(
        `https://api-eu.hosted.exlibrisgroup.com/almaws/v1/bibs/${this.id}/representations?apikey=apikey`, { observe: 'body', responseType: 'text'}
      )
      .subscribe((response: string) => {
        const jsonResponse = JSON.parse(response);
        console.log('JSON Response:', jsonResponse);
        const deliveryUrl = jsonResponse?.representation[0]?.delivery_url;
        if (deliveryUrl) {
          window.open(deliveryUrl, '_blank');
        }
      });
  }
}
