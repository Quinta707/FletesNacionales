﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbEstadosDelPedido
    {
        public tbEstadosDelPedido()
        {
            tbFletes = new HashSet<tbFletes>();
            tbPedidos = new HashSet<tbPedidos>();
        }

        public int estp_Id { get; set; }
        public string estp_Nombre { get; set; }
        public int estp_UsuCreacion { get; set; }
        public DateTime? estp_FechaCreacion { get; set; }
        public int? estp_UsuModificacion { get; set; }
        public DateTime? estp_FechaModificacion { get; set; }
        public bool? estp_Habilitado { get; set; }
        public bool? estp_Estado { get; set; }

        public virtual tbUsuarios estp_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios estp_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbFletes> tbFletes { get; set; }
        public virtual ICollection<tbPedidos> tbPedidos { get; set; }
    }
}
