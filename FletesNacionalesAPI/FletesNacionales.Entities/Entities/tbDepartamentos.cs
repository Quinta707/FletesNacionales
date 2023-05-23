using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbDepartamentos
    {
        public tbDepartamentos()
        {
            tbMunicipios = new HashSet<tbMunicipios>();
        }

        public int depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string depa_Codigo { get; set; }
        public int depa_UsuCreacion { get; set; }
        public DateTime depa_FechaCreacion { get; set; }
        public int? depa_UsuModificacion { get; set; }
        public DateTime? depa_FechaModificacion { get; set; }
        public bool? depa_Habilitado { get; set; }
        public bool? depa_Estado { get; set; }

        public virtual tbUsuarios depa_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios depa_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipios { get; set; }
    }
}
