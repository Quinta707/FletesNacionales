using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class SucursalesViewModel
    {
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public int muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public int depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string sucu_Direccion { get; set; }
        public int sucu_UsuCreacion { get; set; }
        public DateTime? sucu_FechaCreacion { get; set; }
        public int? sucu_UsuModificacion { get; set; }
        public DateTime? sucu_FechaModificacion { get; set; }
        public bool? sucu_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}
