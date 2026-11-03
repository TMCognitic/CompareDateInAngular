import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestForm } from './components/test-form/test-form';

@Component({
  imports: [RouterOutlet, TestForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MyApp');
}
