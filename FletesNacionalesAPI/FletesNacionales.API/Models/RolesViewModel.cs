using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class RolesViewModel
    {
        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public bool role_Habilitado { get; set; }
        public int role_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool role_Estado { get; set; }
    }
}
