﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbPantallasPorRoles
    {
        public int prol_Id { get; set; }
        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_Url { get; set; }
        public string pant_Menu { get; set; }
        public string pant_Icono { get; set; }
        public bool pant_Estado { get; set; }
        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int role_UsuCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool role_Habilitado { get; set; }
        public bool role_Estado { get; set; }
    }
}