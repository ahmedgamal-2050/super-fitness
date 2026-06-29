import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-auth-main-header',
  imports: [],
  templateUrl: './auth-main-header.html',
  styleUrl: './auth-main-header.css',
})
export class AuthMainHeader {
  @Input() mainHeader!: string;
}
