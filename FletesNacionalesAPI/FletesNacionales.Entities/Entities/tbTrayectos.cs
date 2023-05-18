﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbTrayectos
    {
        public tbTrayectos()
        {
            tbEscalasPorTrayecto = new HashSet<tbEscalasPorTrayecto>();
            tbFletes = new HashSet<tbFletes>();
        }

        public int tray_Id { get; set; }
        public int muni_Inicio { get; set; }
        public int muni_Final { get; set; }
        public int tray_UsuCreacion { get; set; }
        public DateTime? tray_FechaCreacion { get; set; }
        public int? tray_UsuModificacion { get; set; }
        public DateTime? tray_FechaModificacion { get; set; }
        public bool? tray_Estado { get; set; }

        public virtual tbMunicipios muni_FinalNavigation { get; set; }
        public virtual tbMunicipios muni_InicioNavigation { get; set; }
        public virtual tbUsuarios tray_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios tray_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEscalasPorTrayecto> tbEscalasPorTrayecto { get; set; }
        public virtual ICollection<tbFletes> tbFletes { get; set; }
    }
}