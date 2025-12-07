import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService, Servicio } from './servicio.service';

@Component({
  selector: 'app-servicio',
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio.html',
  styleUrl: './servicio.css',
})
export class ServicioComponent implements OnInit {
  servicios: Servicio[] = [];
  nuevoServicio: Servicio = this.inicializarFormulario();
  editando = false;
  servicioEditando: Servicio | null = null;
  mostrarFormulario = false;

  categorias = ['Barbería', 'Colorimetría', 'Tratamientos', 'Otros'];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  inicializarFormulario(): Servicio {
    return {
      nombre: '',
      descripcion: '',
      precio: 0,
      duracion: 0,
      categoria: 'Barbería',
      activo: true
    };
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.nuevoServicio = this.inicializarFormulario();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.nuevoServicio = this.inicializarFormulario();
  }

  guardarServicio(): void {
    if (this.validarFormulario()) {
      if (this.editando && this.servicioEditando?.id) {
        this.servicioService.actualizarServicio(this.servicioEditando.id, this.nuevoServicio)
          .subscribe({
            next: () => {
              alert('Servicio actualizado correctamente');
              this.cerrarFormulario();
            },
            error: (error) => alert('Error: ' + error.message)
          });
      } else {
        this.servicioService.agregarServicio(this.nuevoServicio)
          .subscribe({
            next: () => {
              alert('Servicio agregado correctamente');
              this.cerrarFormulario();
            },
            error: (error) => alert('Error: ' + error.message)
          });
      }
    }
  }

  editarServicio(servicio: Servicio): void {
    this.mostrarFormulario = true;
    this.editando = true;
    this.servicioEditando = servicio;
    this.nuevoServicio = { ...servicio };
  }

  eliminarServicio(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicioService.eliminarServicio(id)
        .subscribe({
          next: () => alert('Servicio eliminado'),
          error: (error) => alert('Error: ' + error.message)
        });
    }
  }

  validarFormulario(): boolean {
    if (!this.nuevoServicio.nombre.trim()) {
      alert('El nombre del servicio es requerido');
      return false;
    }
    if (!this.nuevoServicio.descripcion.trim()) {
      alert('La descripción es requerida');
      return false;
    }
    if (this.nuevoServicio.precio <= 0) {
      alert('El precio debe ser mayor a 0');
      return false;
    }
    if (this.nuevoServicio.duracion <= 0) {
      alert('La duración debe ser mayor a 0 minutos');
      return false;
    }
    if (!this.nuevoServicio.categoria) {
      alert('La categoría es requerida');
      return false;
    }
    return true;
  }

  toggleActivo(servicio: Servicio): void {
    if (servicio.id) {
      const servicioActualizado = { ...servicio, activo: !servicio.activo };
      this.servicioService.actualizarServicio(servicio.id, servicioActualizado);
    }
  }
}
