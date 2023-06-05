using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class PedidosViewModel
    {
        public int pedi_Id { get; set; }
        public int clie_Id { get; set; }
        public string muni_Origen { get; set; }
        public string muni_Destino { get; set; }
        public string pedi_DestinoFinal { get; set; }
        public int estp_Id { get; set; }
        public int meto_Id { get; set; }
        public int pedi_UsuCreacion { get; set; }
        public DateTime? pedi_FechaCreacion { get; set; }
        public int? pedi_UsuModificacion { get; set; }
        public DateTime? pedi_FechaModificacion { get; set; }
        public bool? pedi_Estado { get; set; }
    }
}
