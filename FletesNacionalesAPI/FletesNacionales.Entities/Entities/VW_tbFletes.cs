﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbFletes
    {
        public int flet_Id { get; set; }
        public int vehi_Id { get; set; }
        public int empe_Id { get; set; }
        public int tray_Id { get; set; }
        public DateTime flet_FechaDeSalida { get; set; }
        public int flet_UsuCreacion { get; set; }
        public DateTime? flet_FechaCreacion { get; set; }
        public int? flet_UsuModificacion { get; set; }
        public DateTime? flet_FechaModificacion { get; set; }
        public bool? flet_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}