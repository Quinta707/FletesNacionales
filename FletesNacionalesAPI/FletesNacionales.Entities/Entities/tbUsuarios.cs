﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbUsuarios
    {
        public tbUsuarios()
        {
            Inverseuser_UsuCreacionNavigation = new HashSet<tbUsuarios>();
            Inverseuser_UsuModificacionNavigation = new HashSet<tbUsuarios>();
            tbCargoscarg_UsuCreacionNavigation = new HashSet<tbCargos>();
            tbCargoscarg_UsuModificacionNavigation = new HashSet<tbCargos>();
            tbClientesclie_UsuCreacionNavigation = new HashSet<tbClientes>();
            tbClientesclie_UsuModificacionNavigation = new HashSet<tbClientes>();
            tbDepartamentosdepa_UsuCreacionNavigation = new HashSet<tbDepartamentos>();
            tbDepartamentosdepa_UsuModificacionNavigation = new HashSet<tbDepartamentos>();
            tbEmpleadosempe_UsuCreacionNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosempe_UsuModificacionNavigation = new HashSet<tbEmpleados>();
            tbEscalasPorTrayectoestr_UsuCreacionNavigation = new HashSet<tbEscalasPorTrayecto>();
            tbEscalasPorTrayectoestr_UsuModificacionNavigation = new HashSet<tbEscalasPorTrayecto>();
            tbEstadosCivileseciv_UsuCreacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosCivileseciv_UsuModificacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosDelPedidoestp_UsuCreacionNavigation = new HashSet<tbEstadosDelPedido>();
            tbEstadosDelPedidoestp_UsuModificacionNavigation = new HashSet<tbEstadosDelPedido>();
            tbFleteDetallesfdet_UsuCreacionNavigation = new HashSet<tbFleteDetalles>();
            tbFleteDetallesfdet_UsuModificacionNavigation = new HashSet<tbFleteDetalles>();
            tbFletesflet_UsuCreacionNavigation = new HashSet<tbFletes>();
            tbFletesflet_UsuModificacionNavigation = new HashSet<tbFletes>();
            tbItemsitem_UsuCreacionNavigation = new HashSet<tbItems>();
            tbItemsitem_UsuModificacionNavigation = new HashSet<tbItems>();
            tbMarcasmarc_UsuCreacionNavigation = new HashSet<tbMarcas>();
            tbMarcasmarc_UsuModificacionNavigation = new HashSet<tbMarcas>();
            tbMetodosdePagometo_UsuCreacionNavigation = new HashSet<tbMetodosdePago>();
            tbMetodosdePagometo_UsuModificacionNavigation = new HashSet<tbMetodosdePago>();
            tbModelosmode_UsuCreacionNavigation = new HashSet<tbModelos>();
            tbModelosmode_UsuModificacionNavigation = new HashSet<tbModelos>();
            tbMunicipiosmuni_UsuCreacionNavigation = new HashSet<tbMunicipios>();
            tbMunicipiosmuni_UsuModificacionNavigation = new HashSet<tbMunicipios>();
            tbPantallasPorRolesprol_UsuCreacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPantallasPorRolesprol_UsuModificacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPedidoDetallespdet_UsuCreacionNavigation = new HashSet<tbPedidoDetalles>();
            tbPedidoDetallespdet_UsuModificacionNavigation = new HashSet<tbPedidoDetalles>();
            tbPedidospedi_UsuCreacionNavigation = new HashSet<tbPedidos>();
            tbPedidospedi_UsuModificacionNavigation = new HashSet<tbPedidos>();
            tbRolesrole_UsuCreacionNavigation = new HashSet<tbRoles>();
            tbRolesrole_UsuModificacionNavigation = new HashSet<tbRoles>();
            tbSucursalessucu_UsuCreacionNavigation = new HashSet<tbSucursales>();
            tbSucursalessucu_UsuModificacionNavigation = new HashSet<tbSucursales>();
            tbTipoDeVehiculotipv_UsuCreacionNavigation = new HashSet<tbTipoDeVehiculo>();
            tbTipoDeVehiculotipv_UsuModificacionNavigation = new HashSet<tbTipoDeVehiculo>();
            tbTrayectostray_UsuCreacionNavigation = new HashSet<tbTrayectos>();
            tbTrayectostray_UsuModificacionNavigation = new HashSet<tbTrayectos>();
            tbUbicacionPorFleteubif_UsuCreacionNavigation = new HashSet<tbUbicacionPorFlete>();
            tbUbicacionPorFleteubif_UsuModificacionNavigation = new HashSet<tbUbicacionPorFlete>();
            tbVehiculosvehi_UsuCreacionNavigation = new HashSet<tbVehiculos>();
            tbVehiculosvehi_UsuModificacionNavigation = new HashSet<tbVehiculos>();
        }
        [NotMapped]
        public string empe_NombreCompleto { get; set; }
        [NotMapped]
        public string role_Nombre { get; set; }
        public int user_Id { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasena { get; set; }
        public bool? user_EsAdmin { get; set; }
        public int? role_Id { get; set; }
        public int? empe_Id { get; set; }
        public string user_Url { get; set; }
        public int user_UsuCreacion { get; set; }
        public DateTime user_FechaCreacion { get; set; }
        public int? user_UsuModificacion { get; set; }
        public DateTime? user_FechaModificacion { get; set; }
        public bool? user_Estado { get; set; }

        public virtual tbEmpleados empe { get; set; }
        public virtual tbRoles role { get; set; }
        public virtual tbUsuarios user_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios user_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseuser_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseuser_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbCargos> tbCargoscarg_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbCargos> tbCargoscarg_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesclie_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesclie_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEscalasPorTrayecto> tbEscalasPorTrayectoestr_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEscalasPorTrayecto> tbEscalasPorTrayectoestr_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivileseciv_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivileseciv_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEstadosDelPedido> tbEstadosDelPedidoestp_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosDelPedido> tbEstadosDelPedidoestp_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbFleteDetalles> tbFleteDetallesfdet_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbFleteDetalles> tbFleteDetallesfdet_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbFletes> tbFletesflet_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbFletes> tbFletesflet_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbItems> tbItemsitem_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbItems> tbItemsitem_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMarcas> tbMarcasmarc_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMarcas> tbMarcasmarc_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMetodosdePago> tbMetodosdePagometo_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMetodosdePago> tbMetodosdePagometo_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelosmode_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelosmode_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesprol_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesprol_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPedidoDetalles> tbPedidoDetallespdet_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbPedidoDetalles> tbPedidoDetallespdet_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPedidos> tbPedidospedi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbPedidos> tbPedidospedi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalessucu_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalessucu_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbTipoDeVehiculo> tbTipoDeVehiculotipv_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbTipoDeVehiculo> tbTipoDeVehiculotipv_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbTrayectos> tbTrayectostray_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbTrayectos> tbTrayectostray_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbUbicacionPorFlete> tbUbicacionPorFleteubif_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbUbicacionPorFlete> tbUbicacionPorFleteubif_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbVehiculos> tbVehiculosvehi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbVehiculos> tbVehiculosvehi_UsuModificacionNavigation { get; set; }
    }
}