using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbMarcas
    {
        public tbMarcas()
        {
            tbModelos = new HashSet<tbModelos>();
        }

        public int marc_Id { get; set; }
        public string marc_Nombre { get; set; }
        public int marc_UsuCreacion { get; set; }
        public DateTime? marc_FechaCreacion { get; set; }
        public int? marc_UsuModificacion { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
        public bool? marc_Habilitado { get; set; }
        public bool? marc_Estado { get; set; }

        public virtual tbUsuarios marc_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios marc_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelos { get; set; }
    }
}
