using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class TrayectosViewModel
    {
        public int tray_Id { get; set; }
        public string tray_Descripcion { get; set; }
        public string muni_Inicio { get; set; }
        public decimal? tray_Precio { get; set; }
        public string muni_InicioNombre { get; set; }
        public string depa_Inicio { get; set; }
        public string depa_InicioNombre { get; set; }
        public string muni_Final { get; set; }
        public string muni_FinalNombre { get; set; }
        public string depa_Final { get; set; }
        public string depa_FinalNombre { get; set; }
        public int tray_UsuCreacion { get; set; }
        public DateTime? tray_FechaCreacion { get; set; }
        public int? tray_UsuModificacion { get; set; }
        public DateTime? tray_FechaModificacion { get; set; }
        public bool? tray_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}
