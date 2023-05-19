using System;

namespace FletesNacionales.API.Models
{
    public class MetodoDePagoViewModel
    {
        public int meto_Id { get; set; }
        public string meto_Descripcion { get; set; }
        public bool meto_Habilitado { get; set; }
        public string meto_Visible { get; set; }
        public int meto_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime? meto_FechaCreacion { get; set; }
        public int? meto_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? meto_FechaModificacion { get; set; }
        public bool? meto_Estado { get; set; }
    }
}
