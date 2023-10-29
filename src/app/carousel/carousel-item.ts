import { Component } from "@angular/core";

@Component({
  selector: 'app-carousel-item',
  template: ` 
  <div class="carousel-item">
    <ng-content></ng-content>
  </div>`,
})
export class AppCarouselItem {
  private classes: string[] = [];

  addClass(className: string) {
    this.classes.push(className);
  }

  getClasses(): string {
    return this.classes.join(' ');
  }
}
