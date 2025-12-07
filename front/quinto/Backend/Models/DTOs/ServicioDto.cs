namespace Backend.Models.DTOs
{
    public class ServicioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Duracion { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public bool Activo { get; set; }
    }

    public class CreateServicioDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Duracion { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
    }

    public class UpdateServicioDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Duracion { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public bool Activo { get; set; }
    }
}
