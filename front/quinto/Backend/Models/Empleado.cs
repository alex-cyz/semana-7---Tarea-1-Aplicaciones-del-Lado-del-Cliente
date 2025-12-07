namespace Backend.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Puesto { get; set; } = string.Empty;
        public decimal Salario { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
    }
}
