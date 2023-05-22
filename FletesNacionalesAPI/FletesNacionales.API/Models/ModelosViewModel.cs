using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class ModelosViewModel
    {
        public int mode_Id { get; set; }
        public string mode_Nombre { get; set; }
        public int marc_Id { get; set; }
        public int tipv_Id { get; set; }
        public int mode_UsuCreacion { get; set; }
        public DateTime? mode_FechaCreacion { get; set; }
        public int? mode_UsuModificacion { get; set; }
        public DateTime? mode_FechaModificacion { get; set; }
        public bool? mode_Habilitado { get; set; }
        public bool? mode_Estado { get; set; }
    }
}
