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
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<ClienteViewModel, tbClientes>().ReverseMap();
            CreateMap<FletesViewModel, tbFleteDetalles>().ReverseMap();
            CreateMap<FletesViewModel, tbFletes>().ReverseMap();
            CreateMap<ItemsViewModel, tbItems>().ReverseMap();
        }
    }
}
