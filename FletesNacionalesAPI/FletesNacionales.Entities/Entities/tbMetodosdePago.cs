﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbMetodosdePago
    {
        public int meto_Id { get; set; }
        public string meto_Descripcion { get; set; }
        public int meto_UsuCreacion { get; set; }
        public DateTime? meto_FechaCreacion { get; set; }
        public int? meto_UsuModificacion { get; set; }
        public DateTime? meto_FechaModificacion { get; set; }
        public bool? meto_Estado { get; set; }

        public virtual tbUsuarios meto_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios meto_UsuModificacionNavigation { get; set; }
    }
}