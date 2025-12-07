using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IEmpleadoService
    {
        Task<IEnumerable<EmpleadoDto>> GetAllAsync();
        Task<EmpleadoDto> GetByIdAsync(int id);
        Task<EmpleadoDto> CreateAsync(CreateEmpleadoDto dto);
        Task UpdateAsync(int id, UpdateEmpleadoDto dto);
        Task DeleteAsync(int id);
    }

    public class EmpleadoService : IEmpleadoService
    {
        private readonly AppDbContext _context;

        public EmpleadoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmpleadoDto>> GetAllAsync()
        {
            var empleados = await _context.Empleados.ToListAsync();
            return empleados.Select(MapToDto).ToList();
        }

        public async Task<EmpleadoDto> GetByIdAsync(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
                throw new KeyNotFoundException($"Empleado con ID {id} no encontrado");
            return MapToDto(empleado);
        }

        public async Task<EmpleadoDto> CreateAsync(CreateEmpleadoDto dto)
        {
            var empleado = new Empleado
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Puesto = dto.Puesto,
                Salario = dto.Salario,
                FechaIngreso = dto.FechaIngreso
            };

            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();
            return MapToDto(empleado);
        }

        public async Task UpdateAsync(int id, UpdateEmpleadoDto dto)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
                throw new KeyNotFoundException($"Empleado con ID {id} no encontrado");

            empleado.Nombre = dto.Nombre;
            empleado.Apellido = dto.Apellido;
            empleado.Email = dto.Email;
            empleado.Puesto = dto.Puesto;
            empleado.Salario = dto.Salario;
            empleado.FechaIngreso = dto.FechaIngreso;

            _context.Empleados.Update(empleado);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
                throw new KeyNotFoundException($"Empleado con ID {id} no encontrado");

            _context.Empleados.Remove(empleado);
            await _context.SaveChangesAsync();
        }

        private EmpleadoDto MapToDto(Empleado empleado)
        {
            return new EmpleadoDto
            {
                Id = empleado.Id,
                Nombre = empleado.Nombre,
                Apellido = empleado.Apellido,
                Email = empleado.Email,
                Puesto = empleado.Puesto,
                Salario = empleado.Salario,
                FechaIngreso = empleado.FechaIngreso
            };
        }
    }
}
