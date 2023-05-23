﻿using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbEstadosCiviles
    {
        public tbEstadosCiviles()
        {
            tbClientes = new HashSet<tbClientes>();
            tbEmpleados = new HashSet<tbEmpleados>();
        }

        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int eciv_UsuCreacion { get; set; }
        public DateTime eciv_FechaCreacion { get; set; }
        public int? eciv_UsuModificacion { get; set; }
        public DateTime? eciv_FechaModificacion { get; set; }
        public bool? eciv_Habilitado { get; set; }
        public bool? eciv_Estado { get; set; }

        public virtual tbUsuarios eciv_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios eciv_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientes { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
    }
}
