import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService, Empleado } from './empleado.service';

@Component({
  selector: 'app-empleado',
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = this.inicializarFormulario();
  editando = false;
  empleadoEditando: Empleado | null = null;
  mostrarFormulario = false;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  inicializarFormulario(): Empleado {
    return {
      nombre: '',
      apellido: '',
      email: '',
      puesto: '',
      salario: 0,
      fechaIngreso: ''
    };
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.nuevoEmpleado = this.inicializarFormulario();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.nuevoEmpleado = this.inicializarFormulario();
  }

  guardarEmpleado(): void {
    if (this.validarFormulario()) {
      if (this.editando && this.empleadoEditando?.id) {
        this.empleadoService.actualizarEmpleado(this.empleadoEditando.id, this.nuevoEmpleado);
      } else {
        this.empleadoService.agregarEmpleado(this.nuevoEmpleado);
      }
      this.cerrarFormulario();
    }
  }

  editarEmpleado(empleado: Empleado): void {
    this.mostrarFormulario = true;
    this.editando = true;
    this.empleadoEditando = empleado;
    this.nuevoEmpleado = { ...empleado };
  }

  eliminarEmpleado(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id);
    }
  }

  validarFormulario(): boolean {
    if (!this.nuevoEmpleado.nombre.trim()) {
      alert('El nombre es requerido');
      return false;
    }
    if (!this.nuevoEmpleado.apellido.trim()) {
      alert('El apellido es requerido');
      return false;
    }
    if (!this.nuevoEmpleado.email.trim() || !this.isEmailValido(this.nuevoEmpleado.email)) {
      alert('El email es inválido');
      return false;
    }
    if (!this.nuevoEmpleado.puesto.trim()) {
      alert('El puesto es requerido');
      return false;
    }
    if (this.nuevoEmpleado.salario <= 0) {
      alert('El salario debe ser mayor a 0');
      return false;
    }
    if (!this.nuevoEmpleado.fechaIngreso) {
      alert('La fecha de ingreso es requerida');
      return false;
    }
    return true;
  }

  isEmailValido(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }
}
