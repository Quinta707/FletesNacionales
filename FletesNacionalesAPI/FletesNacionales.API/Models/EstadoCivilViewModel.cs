using System;

namespace FletesNacionales.API.Models
{
    public class EstadoCivilViewModel
    {
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int eciv_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime eciv_FechaCreacion { get; set; }
        public int? eciv_UsuModificacion { get; set; }
        public bool eciv_Habilitado { get; set; }
        public string eciv_Visible { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? eciv_FechaModificacion { get; set; }
        public bool eciv_Estado { get; set; }
    }
}
