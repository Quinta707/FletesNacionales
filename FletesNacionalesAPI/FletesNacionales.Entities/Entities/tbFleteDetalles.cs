using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbFleteDetalles
    {
        public int fdet_Id { get; set; }
        public int flet_Id { get; set; }
        public int pedi_Id { get; set; }
        public int fdet_UsuCreacion { get; set; }
        public DateTime? fdet_FechaCreacion { get; set; }
        public int? fdet_UsuModificacion { get; set; }
        public DateTime? fdet_FechaModificacion { get; set; }
        public bool? fdet_Estado { get; set; }

        public virtual tbUsuarios fdet_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios fdet_UsuModificacionNavigation { get; set; }
        public virtual tbFletes flet { get; set; }
        public virtual tbPedidos pedi { get; set; }
    }
}
