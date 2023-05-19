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
