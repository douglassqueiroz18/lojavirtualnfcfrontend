import { Component, input } from '@angular/core'; // Use o input com 'i' minúsculo
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Esta é a forma moderna (Signal-based Input)
  // O Angular entende que 'quantidade' agora é uma função getter
  quantidade = input<number>(0);
}
