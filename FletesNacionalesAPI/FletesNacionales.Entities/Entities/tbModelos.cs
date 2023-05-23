﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbModelos
    {
        public tbModelos()
        {
            tbVehiculos = new HashSet<tbVehiculos>();
        }

        public int mode_Id { get; set; }
        public string mode_Nombre { get; set; }
        public int marc_Id { get; set; }
        public int tipv_Id { get; set; }
        public int mode_UsuCreacion { get; set; }
        public DateTime? mode_FechaCreacion { get; set; }
        public int? mode_UsuModificacion { get; set; }
        public DateTime? mode_FechaModificacion { get; set; }
        public bool? mode_Habilitado { get; set; }
        public bool? mode_Estado { get; set; }

        public virtual tbMarcas marc { get; set; }
        public virtual tbUsuarios mode_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios mode_UsuModificacionNavigation { get; set; }
        public virtual tbTipoDeVehiculo tipv { get; set; }
        public virtual ICollection<tbVehiculos> tbVehiculos { get; set; }
    }
}
