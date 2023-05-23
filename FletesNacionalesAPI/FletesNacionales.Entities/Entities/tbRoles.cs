﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbRoles
    {
        public tbRoles()
        {
            tbPantallasPorRoles = new HashSet<tbPantallasPorRoles>();
            tbUsuarios = new HashSet<tbUsuarios>();
        }

        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int role_UsuCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool? role_Habilitado { get; set; }
        public bool? role_Estado { get; set; }

        public virtual tbUsuarios role_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios role_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRoles { get; set; }
        public virtual ICollection<tbUsuarios> tbUsuarios { get; set; }
    }
}
