using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class UbicacionPorFleteViewModel
    {
        public int ubif_Id { get; set; }
        public int flet_Id { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string ubif_UbicacionExacta { get; set; }
        public int ubif_UsuCreacion { get; set; }
        public DateTime? ubif_FechaCreacion { get; set; }
        public int? ubif_UsuModificacion { get; set; }
        public DateTime? ubif_FechaModificacion { get; set; }
        public bool? ubif_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}
