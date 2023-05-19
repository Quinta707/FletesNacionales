using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class FletesViewModel
    {
        public int flet_Id { get; set; }
        public int vehi_Id { get; set; }
        public int empe_Id { get; set; }
        public int tray_Id { get; set; }
        public DateTime flet_FechaDeSalida { get; set; }
        public int flet_UsuCreacion { get; set; }
        public DateTime? flet_FechaCreacion { get; set; }
        public int? flet_UsuModificacion { get; set; }
        public DateTime? flet_FechaModificacion { get; set; }
        public bool? flet_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
        public int fdet_Id { get; set; }
        public int pedi_Id { get; set; }
        public int fdet_UsuCreacion { get; set; }
        public DateTime? fdet_FechaCreacion { get; set; }
        public int? fdet_UsuModificacion { get; set; }
        public DateTime? fdet_FechaModificacion { get; set; }
        public bool? fdet_Estado { get; set; }
    }
}
