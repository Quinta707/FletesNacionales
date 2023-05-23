﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbUbicacionPorFlete
    {
        public int ubif_Id { get; set; }
        public int flet_Id { get; set; }
        public int muni_Id { get; set; }
        public string ubif_UbicacionExacta { get; set; }
        public int ubif_UsuCreacion { get; set; }
        public DateTime? ubif_FechaCreacion { get; set; }
        public int? ubif_UsuModificacion { get; set; }
        public DateTime? ubif_FechaModificacion { get; set; }
        public bool? ubif_Estado { get; set; }

        public virtual tbFletes flet { get; set; }
        public virtual tbUsuarios ubif_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios ubif_UsuModificacionNavigation { get; set; }
    }
}
