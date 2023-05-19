using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class ClienteViewModel
    {
        public int clie_Id { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_Apellidos { get; set; }
        public string clie_Identidad { get; set; }
        public string clie_NombreCompleto { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int muni_Id { get; set; }
        public string muni_Codigo { get; set; }
        public string muni_Nombre { get; set; }
        public int depa_Id { get; set; }
        public string depa_Codigo { get; set; }
        public string depa_Nombre { get; set; }
        public string clie_DireccionExacta { get; set; }
        public string clie_Telefono { get; set; }
        public bool clie_Habilitado { get; set; }
        public string clie_Visible { get; set; }
        public int clie_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime clie_FechaCreacion { get; set; }
        public int? clie_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public bool clie_Estado { get; set; }
    }
}
