using System;

namespace FletesNacionales.API.Models
{
    public class CargosViewModel
    {
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public bool carg_Habilitado { get; set; }
        public string carg_Visible { get; set; }
        public int carg_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime? carg_FechaCreacion { get; set; }
        public int? carg_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? carg_FechaModificacion { get; set; }
        public bool? carg_Estado { get; set; }
    }
}
