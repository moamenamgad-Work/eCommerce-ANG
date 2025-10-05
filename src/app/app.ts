import {
  Component,
  DOCUMENT,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // protected title = 'ecomrce-project-1';

  title = 'ecomrce-project-1';
  private platformId = inject(PLATFORM_ID);
  private doc = isPlatformBrowser(this.platformId) ? inject(DOCUMENT) : null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running in the browser ✅');
    } else {
      console.log('Running on the server 🖥️');
    }
  }
}
