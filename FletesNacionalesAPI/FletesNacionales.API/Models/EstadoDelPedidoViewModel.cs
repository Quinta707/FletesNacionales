using System;

namespace FletesNacionales.API.Models
{
    public class EstadoDelPedidoViewModel
    {
        public int estp_Id { get; set; }
        public string estp_Nombre { get; set; }
        public int estp_UsuCreacion { get; set; }
        public bool estp_Habilitado { get; set; }
        public string estp_Visible { get; set; }
        public string user_Creacion { get; set; }
        public DateTime? estp_FechaCreacion { get; set; }
        public int? estp_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}
