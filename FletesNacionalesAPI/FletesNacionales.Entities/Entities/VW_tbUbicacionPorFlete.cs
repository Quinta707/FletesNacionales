﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbUbicacionPorFlete
    {
        public int ubif_Id { get; set; }
        public int flet_Id { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string ubif_UbicacionExacta { get; set; }
        public int ubif_UsuCreacion { get; set; }
        public DateTime? ubif_FechaCreacion { get; set; }
        public int? ubif_UsuModificacion { get; set; }
        public DateTime? ubif_FechaModificacion { get; set; }
        public bool? ubif_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}