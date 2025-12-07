import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  puesto: string;
  salario: number;
  fechaIngreso: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:5000/api/empleados';
  private empleados$ = new BehaviorSubject<Empleado[]>([]);

  constructor(private http: HttpClient) {
    this.cargarEmpleados();
  }

  private cargarEmpleados(): void {
    this.http.get<Empleado[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Empleados cargados:', data);
        this.empleados$.next(data);
      },
      error: (error) => {
        console.error('Error cargando empleados:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
      }
    });
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.empleados$.asObservable();
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado).pipe(
      tap(() => this.cargarEmpleados())
    );
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado).pipe(
      tap(() => this.cargarEmpleados())
    );
  }

  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.cargarEmpleados())
    );
  }
}
