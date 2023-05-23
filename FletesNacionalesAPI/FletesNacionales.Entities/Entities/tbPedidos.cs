﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbPedidos
    {
        public tbPedidos()
        {
            tbFleteDetalles = new HashSet<tbFleteDetalles>();
            tbPedidoDetalles = new HashSet<tbPedidoDetalles>();
        }

        public int pedi_Id { get; set; }
        public int clie_Id { get; set; }
        public int muni_Origen { get; set; }
        public int muni_Destino { get; set; }
        public string pedi_DestinoFinal { get; set; }
        public int estp_Id { get; set; }
        public int pedi_UsuCreacion { get; set; }
        public DateTime? pedi_FechaCreacion { get; set; }
        public int? pedi_UsuModificacion { get; set; }
        public DateTime? pedi_FechaModificacion { get; set; }
        public bool? pedi_Estado { get; set; }

        public virtual tbEstadosDelPedido estp { get; set; }
        public virtual tbMunicipios muni_DestinoNavigation { get; set; }
        public virtual tbMunicipios muni_OrigenNavigation { get; set; }
        public virtual tbUsuarios pedi_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios pedi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbFleteDetalles> tbFleteDetalles { get; set; }
        public virtual ICollection<tbPedidoDetalles> tbPedidoDetalles { get; set; }
    }
}
