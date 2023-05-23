﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbEscalasPorTrayecto
    {
        public int estr_Id { get; set; }
        public int flet_Id { get; set; }
        public int muni_Escala { get; set; }
        public int estr_UsuCreacion { get; set; }
        public DateTime? estr_FechaCreacion { get; set; }
        public int? estr_UsuModificacion { get; set; }
        public DateTime? estr_FechaModificacion { get; set; }
        public bool? estr_Estado { get; set; }

        public virtual tbUsuarios estr_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios estr_UsuModificacionNavigation { get; set; }
        public virtual tbFletes flet { get; set; }
        public virtual tbMunicipios muni_EscalaNavigation { get; set; }
    }
}
