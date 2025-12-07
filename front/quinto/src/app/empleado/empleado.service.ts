import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private empleados$ = new BehaviorSubject<Empleado[]>([
    {
      id: 1,
      nombre: 'Alex',
      apellido: 'Muñoz',
      email: 'alex@gmail.com',
      puesto: 'Desarrollador',
      salario: 3000,
      fechaIngreso: '2025-01-15'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Sanchez',
      email: 'maria@gmail.com',
      puesto: 'Diseñadora',
      salario: 2800,
      fechaIngreso: '2025-02-20'
    },
    {
      id: 3,
      nombre: 'Jose',
      apellido: 'Shariana',
      email: 'Jose@gmail.com',
      puesto: 'Gerente',
      salario: 4000,
      fechaIngreso: '2025-06-10'
    }
  ]);

  constructor() {}

  getEmpleados(): Observable<Empleado[]> {
    return this.empleados$.asObservable();
  }

  agregarEmpleado(empleado: Empleado): void {
    const empleados = this.empleados$.value;
    const nuevoId = Math.max(...empleados.map(e => e.id || 0), 0) + 1;
    empleado.id = nuevoId;
    this.empleados$.next([...empleados, empleado]);
  }

  actualizarEmpleado(id: number, empleado: Empleado): void {
    const empleados = this.empleados$.value.map(e =>
      e.id === id ? { ...empleado, id } : e
    );
    this.empleados$.next(empleados);
  }

  eliminarEmpleado(id: number): void {
    const empleados = this.empleados$.value.filter(e => e.id !== id);
    this.empleados$.next(empleados);
  }
}
