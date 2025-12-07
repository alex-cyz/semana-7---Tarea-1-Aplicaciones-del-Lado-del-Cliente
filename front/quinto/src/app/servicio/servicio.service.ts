import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number; // en minutos
  categoria: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicios$ = new BehaviorSubject<Servicio[]>([
    {
      id: 1,
      nombre: 'Corte de cabello',
      descripcion: 'Corte de cabello profesional con estilo',
      precio: 25,
      duracion: 30,
      categoria: 'Barbería',
      activo: true
    },
    {
      id: 2,
      nombre: 'Afeitado',
      descripcion: 'Afeitado profesional con navaja',
      precio: 15,
      duracion: 20,
      categoria: 'Barbería',
      activo: true
    },
    {
      id: 3,
      nombre: 'Tinte',
      descripcion: 'Tinte profesional de cabello',
      precio: 40,
      duracion: 60,
      categoria: 'Colorimetría',
      activo: true
    }
  ]);

  constructor() {}

  getServicios(): Observable<Servicio[]> {
    return this.servicios$.asObservable();
  }

  agregarServicio(servicio: Servicio): void {
    const servicios = this.servicios$.value;
    const nuevoId = Math.max(...servicios.map(s => s.id || 0), 0) + 1;
    servicio.id = nuevoId;
    this.servicios$.next([...servicios, servicio]);
  }

  actualizarServicio(id: number, servicio: Servicio): void {
    const servicios = this.servicios$.value.map(s =>
      s.id === id ? { ...servicio, id } : s
    );
    this.servicios$.next(servicios);
  }

  eliminarServicio(id: number): void {
    const servicios = this.servicios$.value.filter(s => s.id !== id);
    this.servicios$.next(servicios);
  }
}
