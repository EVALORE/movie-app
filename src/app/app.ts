import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Notifications } from './shared/notifications/notifications';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Notifications],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
