using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbClientes
    {
        public int clie_Id { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_Apellidos { get; set; }
        public string clie_Identidad { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public int muni_Id { get; set; }
        public string clie_DireccionExacta { get; set; }
        public string clie_Telefono { get; set; }
        public int clie_UsuCreacion { get; set; }
        public DateTime clie_FechaCreacion { get; set; }
        public int? clie_UsuModificacion { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public bool? clie_Habilitado { get; set; }
        public bool? clie_Estado { get; set; }

        public virtual tbUsuarios clie_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios clie_UsuModificacionNavigation { get; set; }
        public virtual tbEstadosCiviles eciv { get; set; }
        public virtual tbMunicipios muni { get; set; }
    }
}
