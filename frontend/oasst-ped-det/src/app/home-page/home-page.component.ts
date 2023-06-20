import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('videoElement')
  videoElement!: ElementRef;
  square!: HTMLElement;
  public squareStyles: { [key: string]: string } = {};
  public isButtonHovered: boolean = false;
  isHovered = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.square = this.elementRef.nativeElement.querySelector('.square');
  }
  
  ngAfterViewInit() {
    // mute home page background video
    this.videoElement.nativeElement.muted = true;
  }

  @HostListener('mousemove', ['$event'])
  // move bounding box on mouse move
  onMouseMove(event: MouseEvent): void {
    const containerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;

    const mouseX = event.clientX - containerX;
    const mouseY = event.clientY - containerY;

    this.square.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }

  resizeSquare() {
    this.isHovered = true;
  }

  resetSquare() {
    this.isHovered = false;
  }
}
