import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-media-area',
  imports: [],
  templateUrl: './media-area.html',
  styleUrl: './media-area.css',
})
export class MediaArea {
  @Input() image = '';
  videoUrl = input('');
  @Input() title = '';

  @Input() description = '';

  @Input() stats: {
    value: string;
    label: string;
  }[] = [];

  @Input() showPlayButton = false;

  get shortDescription(): string {
    return this.description.length > 200
      ? this.description.substring(0, 200) + '...'
      : this.description;
  }

  openVideo() {
    if (this.videoUrl()) {
      window.open(this.videoUrl(), '_blank');
    }
  }
}
