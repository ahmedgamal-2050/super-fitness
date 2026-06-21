import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private projectName = signal<string>('super-fitness');

  getTranslation(lang: string) {
    const mainPath = `/assets/i18n/${lang}.json`;
    const url =
      window.location.href.indexOf(this.projectName()) > -1
        ? `/${this.projectName()}/${mainPath}`
        : mainPath;
    return this.http.get<Translation>(url);
  }
}
