using System;

namespace FletesNacionales.API.Models
{
    public class EmpleadoViewModel
    {
        public int empe_Id { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_NombreCompleto { get; set; }
        public string empe_Identidad { get; set; }
        public DateTime empe_FechaNacimiento { get; set; }
        public string empe_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public int depa_Id { get; set; }
        public string depa_Codigo { get; set; }
        public string depa_Nombre { get; set; }
        public string empe_DireccionExacta { get; set; }
        public string empe_Telefono { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public bool empe_Habilitado { get; set; }
        public string empe_Visible { get; set; }
        public int empe_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime empe_FechaCreacion { get; set; }
        public int? empe_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? empe_FechaModificacion { get; set; }
        public bool empe_Estado { get; set; }
    }
}
