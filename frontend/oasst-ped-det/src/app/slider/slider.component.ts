import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit, AfterViewInit {
  public currentSlideIndex = 0;
  private currentDotIndex = 0;
  public slides: HTMLElement[] = [];
  private dots: HTMLElement[] = [];
  private slideCountElement!: HTMLElement;

  @ViewChild('slideCount') set content(content: any) {
    this.slideCountElement = content.nativeElement;
  }
  
  ngOnInit(): void {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.dots = Array.from(document.querySelectorAll('.dot'));
    setInterval(() => {
      this.advanceSlide();
    }, 5000);
  }

  ngAfterViewInit() {
    this.slideCountElement.textContent = `${(this.currentSlideIndex + 1).toString().padStart(2, '0')}/${this.slides.length.toString().padStart(2, '0')}`;
  }
  
  private advanceSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.currentDotIndex = (this.currentDotIndex + 1) % this.dots.length;
    this.updateSlideVisibility();
  }
  
  private updateSlideVisibility(): void {
    this.slides.forEach((slide, index) => {
      slide.style.opacity = index === this.currentSlideIndex ? '1' : '0';
    });
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentDotIndex);
    });
    this.slideCountElement.textContent = `${(this.currentSlideIndex + 1).toString().padStart(2, '0')}/${this.slides.length.toString().padStart(2, '0')}`;
  }  
  
  public goToPreviousSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlideVisibility();
  }
  
  public goToNextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.updateSlideVisibility();
  }

  public onDotClicked(dotIndex: number): void {
    this.currentSlideIndex = dotIndex;
    this.currentDotIndex = dotIndex;
    this.updateSlideVisibility();
  }

  public formatSlideNumber(currentIndex: number, totalSlides: number): string {
    const paddedIndex = currentIndex.toString().padStart(2, '0');
    return `${paddedIndex}/${totalSlides.toString().padStart(2, '0')}`;
  }  
    
}
