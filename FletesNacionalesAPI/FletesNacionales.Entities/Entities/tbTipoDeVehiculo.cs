﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbTipoDeVehiculo
    {
        public tbTipoDeVehiculo()
        {
            tbModelos = new HashSet<tbModelos>();
        }

        public int tipv_Id { get; set; }
        public string tipv_Descripcion { get; set; }
        public int tipv_UsuCreacion { get; set; }
        public DateTime? tipv_FechaCreacion { get; set; }
        public int? tipv_UsuModificacion { get; set; }
        public DateTime? tipv_FechaModificacion { get; set; }
        public bool? tipv_Habilitado { get; set; }
        public bool? tipv_Estado { get; set; }

        public virtual tbUsuarios tipv_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios tipv_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelos { get; set; }
    }
}