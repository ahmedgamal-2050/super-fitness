import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-auth-second-header',
  imports: [],
  templateUrl: './auth-second-header.html',
  styleUrl: './auth-second-header.css',
})
export class AuthSecondHeader {
  @Input() seconHeader!: string;
}
