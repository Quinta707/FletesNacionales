using System;

namespace FletesNacionales.API.Models
{
    public class MunicipiosViewModel
    {
        public int muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public int depa_Id { get; set; }
        public int muni_UsuCreacion { get; set; }
        public DateTime muni_FechaCreacion { get; set; }
        public int? muni_UsuModificacion { get; set; }
        public DateTime? muni_FechaModificacion { get; set; }
        public bool? muni_Habilitado { get; set; }
        public bool? muni_Estado { get; set; }

    }
}
