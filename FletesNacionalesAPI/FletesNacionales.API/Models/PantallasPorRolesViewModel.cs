using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class PantallasPorRolesViewModel
    {
        public int prol_Id { get; set; }
        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_Url { get; set; }
        public string pant_Menu { get; set; }
        public string pant_Icono { get; set; }
        public bool pant_Estado { get; set; }
        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int role_UsuCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool role_Habilitado { get; set; }
        public bool role_Estado { get; set; }
        public int[] pantallas { get; set; }
        public int prol_UsuCreacion { get; set; }
        public DateTime prol_FechaCreacion { get; set; }
        public int? prol_UsuModificacion { get; set; }
        public DateTime? prol_FechaModificacion { get; set; }
        public bool? prol_Estado { get; set; }


    }
}
