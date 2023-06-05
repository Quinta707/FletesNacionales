using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class VehiculosViewModel
    {
        public int vehi_Id { get; set; }
        public int mode_Id { get; set; }
        public decimal vehi_PesoMaximo { get; set; }
        public decimal vehi_VolumenMaximo { get; set; }
        public string vehi_Placa { get; set; }
        public int vehi_UsuCreacion { get; set; }
        public DateTime? vehi_FechaCreacion { get; set; }
        public int? vehi_UsuModificacion { get; set; }
        public DateTime? vehi_FechaModificacion { get; set; }
        public bool vehi_EnUso { get; set; }
        public bool? vehi_Estado { get; set; }

    }
}
