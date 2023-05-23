using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbItems
    {
        public tbItems()
        {
            tbPedidoDetalles = new HashSet<tbPedidoDetalles>();
        }

        public int item_Id { get; set; }
        public string item_Nombre { get; set; }
        public string item_Descripcion { get; set; }
        public decimal item_Peso { get; set; }
        public decimal item_Volumen { get; set; }
        public int item_UsuCreacion { get; set; }
        public DateTime? item_FechaCreacion { get; set; }
        public int? item_UsuModificacion { get; set; }
        public DateTime? item_FechaModificacion { get; set; }
        public bool? item_Habilitado { get; set; }
        public bool? item_Estado { get; set; }

        public virtual tbUsuarios item_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios item_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPedidoDetalles> tbPedidoDetalles { get; set; }
    }
}
