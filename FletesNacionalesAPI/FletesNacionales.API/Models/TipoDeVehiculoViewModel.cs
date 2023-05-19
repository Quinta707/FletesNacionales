using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class TipoDeVehiculoViewModel
    {
        public int tipv_Id { get; set; }
        public string tipv_Descripcion { get; set; }
        public int tipv_UsuCreacion { get; set; }
        public DateTime? tipv_FechaCreacion { get; set; }
        public int? tipv_UsuModificacion { get; set; }
        public DateTime? tipv_FechaModificacion { get; set; }
        public bool? tipv_Habilitado { get; set; }
        public bool? tipv_Estado { get; set; }
    }
}
