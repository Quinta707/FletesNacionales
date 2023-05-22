using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class TrayectosViewModel
    {
        public int tray_Id { get; set; }
        public int muni_Inicio { get; set; }
        public int muni_Final { get; set; }
        public int tray_UsuCreacion { get; set; }
        public DateTime? tray_FechaCreacion { get; set; }
        public int? tray_UsuModificacion { get; set; }
        public DateTime? tray_FechaModificacion { get; set; }
        public bool? tray_Estado { get; set; }
    }
}
