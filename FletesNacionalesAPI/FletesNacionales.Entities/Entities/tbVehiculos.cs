﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbVehiculos
    {
        public tbVehiculos()
        {
            tbFletes = new HashSet<tbFletes>();
        }

        public int vehi_Id { get; set; }
        public int mode_Id { get; set; }
        public decimal vehi_PesoMaximo { get; set; }
        public decimal vehi_VolumenMaximo { get; set; }
        public string vehi_Placa { get; set; }
        public int vehi_UsuCreacion { get; set; }
        public DateTime? vehi_FechaCreacion { get; set; }
        public int? vehi_UsuModificacion { get; set; }
        public DateTime? vehi_FechaModificacion { get; set; }
        public bool vehi_EnUso { get; set; }
        public bool? vehi_Estado { get; set; }

        public virtual tbModelos mode { get; set; }
        public virtual tbUsuarios vehi_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios vehi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbFletes> tbFletes { get; set; }
    }
}
