﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbFletes
    {
        public tbFletes()
        {
            tbEscalasPorTrayecto = new HashSet<tbEscalasPorTrayecto>();
            tbFleteDetalles = new HashSet<tbFleteDetalles>();
            tbUbicacionPorFlete = new HashSet<tbUbicacionPorFlete>();
        }

        public int flet_Id { get; set; }
        public int vehi_Id { get; set; }
        public int empe_Id { get; set; }
        public int tray_Id { get; set; }
        public int estp_Id { get; set; }
        public DateTime flet_FechaDeSalida { get; set; }
        public int flet_UsuCreacion { get; set; }
        public DateTime? flet_FechaCreacion { get; set; }
        public int? flet_UsuModificacion { get; set; }
        public DateTime? flet_FechaModificacion { get; set; }
        public bool? flet_Estado { get; set; }

        public virtual tbEmpleados empe { get; set; }
        public virtual tbEstadosDelPedido estp { get; set; }
        public virtual tbUsuarios flet_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios flet_UsuModificacionNavigation { get; set; }
        public virtual tbTrayectos tray { get; set; }
        public virtual tbVehiculos vehi { get; set; }
        public virtual ICollection<tbEscalasPorTrayecto> tbEscalasPorTrayecto { get; set; }
        public virtual ICollection<tbFleteDetalles> tbFleteDetalles { get; set; }
        public virtual ICollection<tbUbicacionPorFlete> tbUbicacionPorFlete { get; set; }
    }
}
