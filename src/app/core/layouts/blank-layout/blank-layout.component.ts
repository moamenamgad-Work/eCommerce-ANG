import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
  imports: [NavbarComponent, RouterOutlet],
})
export class BlankLayoutComponent {}
