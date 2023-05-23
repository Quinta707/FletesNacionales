using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbPedidoDetalles
    {
        public int pdet_Id { get; set; }
        public int pedi_Id { get; set; }
        public int item_Id { get; set; }
        public int pdet_Cantidad { get; set; }
        public int pdet_UsuCreacion { get; set; }
        public DateTime? pdet_FechaCreacion { get; set; }
        public int? pdet_UsuModificacion { get; set; }
        public DateTime? pdet_FechaModificacion { get; set; }
        public bool? pdet_Estado { get; set; }

        public virtual tbItems item { get; set; }
        public virtual tbUsuarios pdet_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios pdet_UsuModificacionNavigation { get; set; }
        public virtual tbPedidos pedi { get; set; }
    }
}
