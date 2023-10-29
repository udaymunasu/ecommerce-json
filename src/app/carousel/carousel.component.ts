import { trigger, transition, style, animate, useAnimation, animation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';


export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('300ms', style({ opacity: 1 }))
]);

export const fadeOut = animation([
  animate('300ms', style({ opacity: 0 }))
]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '1300ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '1300ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  constructor() {}

  @Input() carouselItems: { image: string; name: string }[] = [];
  activeIndex = 0;
  private autoSlideInterval: any; // Variable to hold the interval ID

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  prevSlide() {
    if (this.carouselItems.length > 0) {
      this.activeIndex = (this.activeIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    }
  }

  nextSlide() {
    if (this.carouselItems.length > 0) {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
    }
  }
}
