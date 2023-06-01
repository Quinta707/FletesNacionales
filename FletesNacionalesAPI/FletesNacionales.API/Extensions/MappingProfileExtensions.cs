using AutoMapper;
using FletesNacionales.API.Models;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<PantallasPorRolesViewModel, tbPantallas>().ReverseMap();
            CreateMap<PantallasPorRolesViewModel, VW_tbPantallasPorRoles>().ReverseMap();
            CreateMap<PantallasPorRolesViewModel, tbPantallasPorRoles>().ReverseMap();
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<ClienteViewModel, tbClientes>().ReverseMap();
            CreateMap<FletesViewModel, tbFleteDetalles>().ReverseMap();
            CreateMap<FletesViewModel, tbFletes>().ReverseMap();
            CreateMap<ItemsViewModel, tbItems>().ReverseMap();
            CreateMap<CargosViewModel, tbCargos>().ReverseMap();
            CreateMap<DepartamentosViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<EmpleadoViewModel, tbEmpleados>().ReverseMap();
            CreateMap<EstadoCivilViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<EstadoDelPedidoViewModel, tbEstadosDelPedido>().ReverseMap();
            CreateMap<MetodoDePagoViewModel, tbMetodosdePago>().ReverseMap();
            CreateMap<MunicipiosViewModel, tbMunicipios>().ReverseMap();
            CreateMap<SucursalesViewModel, tbSucursales>().ReverseMap();
            #region equi
            CreateMap<MarcasViewModel, tbMarcas>().ReverseMap();
            CreateMap<ModelosViewModel, tbModelos>().ReverseMap();
            CreateMap<TipoDeVehiculoViewModel, tbTipoDeVehiculo>().ReverseMap();
            CreateMap<VehiculosViewModel, tbVehiculos>().ReverseMap();
            #endregion

            #region flet
            CreateMap<PedidosViewModel, tbPedidos>().ReverseMap();
            CreateMap<PedidoDetallesViewModel, tbPedidoDetalles>().ReverseMap();
            CreateMap<TrayectosViewModel, tbTrayectos>().ReverseMap();
            #endregion
        }
    }
}
