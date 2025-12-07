using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Servicio> Servicios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Empleado>()
                .Property(e => e.Salario)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Servicio>()
                .Property(s => s.Precio)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Empleado>().HasData(
                new Empleado
                {
                    Id = 1,
                    Nombre = "Alex",
                    Apellido = "Muñoz",
                    Email = "alex@gmail.com",
                    Puesto = "Desarrollador",
                    Salario = 3000,
                    FechaIngreso = new DateTime(2025, 1, 15)
                },
                new Empleado
                {
                    Id = 2,
                    Nombre = "María",
                    Apellido = "García",
                    Email = "maria.garcia@empresa.com",
                    Puesto = "Diseñadora",
                    Salario = 2800,
                    FechaIngreso = new DateTime(2025, 2, 20)
                },
                new Empleado
                {
                    Id = 3,
                    Nombre = "Carlos",
                    Apellido = "López",
                    Email = "carlos.lopez@empresa.com",
                    Puesto = "Gerente",
                    Salario = 4000,
                    FechaIngreso = new DateTime(2024, 6, 10)
                }
            );

            modelBuilder.Entity<Servicio>().HasData(
                new Servicio
                {
                    Id = 1,
                    Nombre = "Corte de cabello",
                    Descripcion = "Corte de cabello profesional con estilo",
                    Precio = 25,
                    Duracion = 30,
                    Categoria = "Barbería",
                    Activo = true
                },
                new Servicio
                {
                    Id = 2,
                    Nombre = "Afeitado",
                    Descripcion = "Afeitado profesional con navaja",
                    Precio = 15,
                    Duracion = 20,
                    Categoria = "Barbería",
                    Activo = true
                },
                new Servicio
                {
                    Id = 3,
                    Nombre = "Tinte",
                    Descripcion = "Tinte profesional de cabello",
                    Precio = 40,
                    Duracion = 60,
                    Categoria = "Colorimetría",
                    Activo = true
                }
            );
        }
    }
}
