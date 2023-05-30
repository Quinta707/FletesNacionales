﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbMunicipios
    {
        public tbMunicipios()
        {
            tbClientes = new HashSet<tbClientes>();
            tbEmpleados = new HashSet<tbEmpleados>();
            tbEscalasPorTrayecto = new HashSet<tbEscalasPorTrayecto>();
            tbPedidosmuni_DestinoNavigation = new HashSet<tbPedidos>();
            tbPedidosmuni_OrigenNavigation = new HashSet<tbPedidos>();
            tbSucursales = new HashSet<tbSucursales>();
            tbTrayectosmuni_FinalNavigation = new HashSet<tbTrayectos>();
            tbTrayectosmuni_InicioNavigation = new HashSet<tbTrayectos>();
        }

        public int muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string muni_Codigo { get; set; }
        public int depa_Id { get; set; }
        public int muni_UsuCreacion { get; set; }
        public DateTime muni_FechaCreacion { get; set; }
        public int? muni_UsuModificacion { get; set; }
        public DateTime? muni_FechaModificacion { get; set; }
        public bool? muni_Habilitado { get; set; }
        public bool? muni_Estado { get; set; }

        public virtual tbDepartamentos depa { get; set; }
        public virtual tbUsuarios muni_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios muni_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientes { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
        public virtual ICollection<tbEscalasPorTrayecto> tbEscalasPorTrayecto { get; set; }
        public virtual ICollection<tbPedidos> tbPedidosmuni_DestinoNavigation { get; set; }
        public virtual ICollection<tbPedidos> tbPedidosmuni_OrigenNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursales { get; set; }
        public virtual ICollection<tbTrayectos> tbTrayectosmuni_FinalNavigation { get; set; }
        public virtual ICollection<tbTrayectos> tbTrayectosmuni_InicioNavigation { get; set; }
    }
}