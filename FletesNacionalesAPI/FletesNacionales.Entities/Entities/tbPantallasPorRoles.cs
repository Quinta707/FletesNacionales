﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbPantallasPorRoles
    {
        public int prol_Id { get; set; }
        public int role_Id { get; set; }
        public int pant_Id { get; set; }
        [NotMapped]
        public string pant_Nombre { get; set; }
        public int prol_UsuCreacion { get; set; }
        public DateTime prol_FechaCreacion { get; set; }
        public int? prol_UsuModificacion { get; set; }
        public DateTime? prol_FechaModificacion { get; set; }
        public bool? prol_Estado { get; set; }

        public virtual tbPantallas pant { get; set; }
        public virtual tbUsuarios prol_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios prol_UsuModificacionNavigation { get; set; }
        public virtual tbRoles role { get; set; }
    }
}