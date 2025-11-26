import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/header/header';
import { NotificationContainer } from './shared/components/notification/notification-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NotificationContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
