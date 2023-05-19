using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class PantallasPorRolesViewModel
    {
        public int prol_Id { get; set; }
        public int role_Id { get; set; }
        public int pant_Id { get; set; }
        public int prol_UsuCreacion { get; set; }
        public DateTime prol_FechaCreacion { get; set; }
        public int? prol_UsuModificacion { get; set; }
        public DateTime? prol_FechaModificacion { get; set; }
        public bool? prol_Estado { get; set; }
        public int[] pantallas { get; set; }
    }
}
