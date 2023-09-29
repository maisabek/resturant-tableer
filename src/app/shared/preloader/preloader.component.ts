import { Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {
  ngAfterViewInit(){
    setTimeout(()=>{
      document.getElementById('preloader')?.classList.add('d-none')
    },3000)
  }
}
