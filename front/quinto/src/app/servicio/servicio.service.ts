import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  categoria: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://localhost:5000/api/servicios';
  private servicios$ = new BehaviorSubject<Servicio[]>([]);

  constructor(private http: HttpClient) {
    this.cargarServicios();
  }

  private cargarServicios(): void {
    this.http.get<Servicio[]>(this.apiUrl).subscribe({
      next: (data) => this.servicios$.next(data),
      error: (error) => console.error('Error cargando servicios', error)
    });
  }

  getServicios(): Observable<Servicio[]> {
    return this.servicios$.asObservable();
  }

  agregarServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio).pipe(
      tap(() => this.cargarServicios())
    );
  }

  actualizarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio).pipe(
      tap(() => this.cargarServicios())
    );
  }

  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.cargarServicios())
    );
  }
}
