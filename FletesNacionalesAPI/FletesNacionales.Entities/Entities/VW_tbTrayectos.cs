﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbTrayectos
    {
        public int tray_Id { get; set; }
        public string tray_Descripcion { get; set; }
        public int muni_Inicio { get; set; }
        public string muni_InicioNombre { get; set; }
        public int depa_Inicio { get; set; }
        public string depa_InicioNombre { get; set; }
        public int muni_Final { get; set; }
        public string muni_FinalNombre { get; set; }
        public int depa_Final { get; set; }
        public string depa_FinalNombre { get; set; }
        public int tray_UsuCreacion { get; set; }
        public DateTime? tray_FechaCreacion { get; set; }
        public int? tray_UsuModificacion { get; set; }
        public DateTime? tray_FechaModificacion { get; set; }
        public bool? tray_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}