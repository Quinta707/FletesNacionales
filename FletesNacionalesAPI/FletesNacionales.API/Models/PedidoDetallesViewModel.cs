using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class PedidoDetallesViewModel
    {
        public int pdet_Id { get; set; }
        public int pedi_Id { get; set; }
        public int item_Id { get; set; }
        public int pdet_Cantidad { get; set; }
        public int pdet_UsuCreacion { get; set; }
        public DateTime? pdet_FechaCreacion { get; set; }
        public int? pdet_UsuModificacion { get; set; }
        public DateTime? pdet_FechaModificacion { get; set; }
        public bool? pdet_Estado { get; set; }
    }
}
