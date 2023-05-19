using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class MarcasViewModel
    {
        public int marc_Id { get; set; }
        public string marc_Nombre { get; set; }
        public int marc_UsuCreacion { get; set; }
        public DateTime? marc_FechaCreacion { get; set; }
        public int? marc_UsuModificacion { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
        public bool? marc_Habilitado { get; set; }
        public bool? marc_Estado { get; set; }
    }
}
