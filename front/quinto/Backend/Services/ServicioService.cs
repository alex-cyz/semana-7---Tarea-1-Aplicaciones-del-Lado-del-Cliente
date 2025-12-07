using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IServicioService
    {
        Task<IEnumerable<ServicioDto>> GetAllAsync();
        Task<ServicioDto> GetByIdAsync(int id);
        Task<ServicioDto> CreateAsync(CreateServicioDto dto);
        Task UpdateAsync(int id, UpdateServicioDto dto);
        Task DeleteAsync(int id);
    }

    public class ServicioService : IServicioService
    {
        private readonly AppDbContext _context;

        public ServicioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ServicioDto>> GetAllAsync()
        {
            var servicios = await _context.Servicios.ToListAsync();
            return servicios.Select(MapToDto).ToList();
        }

        public async Task<ServicioDto> GetByIdAsync(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
                throw new KeyNotFoundException($"Servicio con ID {id} no encontrado");
            return MapToDto(servicio);
        }

        public async Task<ServicioDto> CreateAsync(CreateServicioDto dto)
        {
            var servicio = new Servicio
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Duracion = dto.Duracion,
                Categoria = dto.Categoria,
                Activo = dto.Activo
            };

            _context.Servicios.Add(servicio);
            await _context.SaveChangesAsync();
            return MapToDto(servicio);
        }

        public async Task UpdateAsync(int id, UpdateServicioDto dto)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
                throw new KeyNotFoundException($"Servicio con ID {id} no encontrado");

            servicio.Nombre = dto.Nombre;
            servicio.Descripcion = dto.Descripcion;
            servicio.Precio = dto.Precio;
            servicio.Duracion = dto.Duracion;
            servicio.Categoria = dto.Categoria;
            servicio.Activo = dto.Activo;

            _context.Servicios.Update(servicio);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
                throw new KeyNotFoundException($"Servicio con ID {id} no encontrado");

            _context.Servicios.Remove(servicio);
            await _context.SaveChangesAsync();
        }

        private ServicioDto MapToDto(Servicio servicio)
        {
            return new ServicioDto
            {
                Id = servicio.Id,
                Nombre = servicio.Nombre,
                Descripcion = servicio.Descripcion,
                Precio = servicio.Precio,
                Duracion = servicio.Duracion,
                Categoria = servicio.Categoria,
                Activo = servicio.Activo
            };
        }
    }
}
