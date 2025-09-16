import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medium } from './medium';

@Injectable({
  providedIn: 'root'
})
export class MediumService {
  private url = 'http://localhost:5200';
  medien$ = signal<Medium[]>([]);
  medium$ = signal<Medium>({} as Medium);
 
  constructor(private httpClient: HttpClient) { }

  private refreshMedien() {
    this.httpClient.get<Medium[]>(`${this.url}/medien`)
      .subscribe(medien => {
        this.medien$.set(medien);
      });
  }

  getMedien() {
    this.refreshMedien();
    return this.medien$();
  }

  getMedium(id: string) {
    this.httpClient.get<Medium>(`${this.url}/medien/${id}`).subscribe(medium => {
      this.medium$.set(medium);
      return this.medium$();
    });
  }

  createMedium(medium: Medium) {
    return this.httpClient.post(`${this.url}/medien`, medium, { responseType: 'text' });
  }

  updateMedium(id: string, medium: Medium) {
    return this.httpClient.put(`${this.url}/medien/${id}`, medium, { responseType: 'text' });
  }

  deleteMedium(id: string) {
    return this.httpClient.delete(`${this.url}/medien/${id}`, { responseType: 'text' });
  }
}
