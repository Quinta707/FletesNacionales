using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class UsuariosViewModel
    {
        public int user_Id { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasena { get; set; }
        public bool? user_EsAdmin { get; set; }
        public int? role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int? empe_Id { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_NombreCompleto { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public int user_UsuCreacion { get; set; }
        public DateTime user_FechaCreacion { get; set; }
        public int? user_UsuModificacion { get; set; }
        public DateTime? user_FechaModificacion { get; set; }
        public bool user_Estado { get; set; }
    }
}
