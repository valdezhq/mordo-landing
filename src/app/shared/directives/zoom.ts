import { Directive, inject, HostListener, ElementRef } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';

@Directive({
  selector: 'img[appZoom]',
})
export class Zoom {
  private nzImageService = inject(NzImageService);
  private elementRef = inject(ElementRef<HTMLImageElement>);

  @HostListener('click')
  onZoom(): void {
    const image = this.elementRef.nativeElement;
    this.nzImageService.preview([{ src: image.src, alt: image.alt }]);
  }
}
