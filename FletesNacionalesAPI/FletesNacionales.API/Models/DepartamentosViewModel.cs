using System;

namespace FletesNacionales.API.Models
{
    public class DepartamentosViewModel
    {
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public int depa_UsuCreacion { get; set; }
        public bool depa_Habilitado { get; set; }
        public string depa_Visible { get; set; }
        public string user_Creacion { get; set; }
        public DateTime depa_FechaCreacion { get; set; }
        public int? depa_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? depa_FechaModificacion { get; set; }
        public bool depa_Estado { get; set; }
    }
}
