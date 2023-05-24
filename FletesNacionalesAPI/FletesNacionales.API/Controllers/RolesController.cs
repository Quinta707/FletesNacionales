using AutoMapper;
using FletesNacionales.API.Models;
using FletesNacionales.BusinessLogic.Services;
using FletesNacionales.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;

        public RolesController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _acceService.ListadoRoles();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(RolesViewModel roles)
        {
            var item = _mapper.Map<tbRoles>(roles);
            var response = _acceService.InsertarRoles(item);
            return Ok(response);
        }

        [HttpPut("Actualizar")]
        public IActionResult Update(RolesViewModel roles)
        {
            var item = _mapper.Map<tbRoles>(roles);
            var response = _acceService.ActualizarRoles(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(RolesViewModel roles)
        {
            var item = _mapper.Map<tbRoles>(roles);
            var response = _acceService.EliminarRoles(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _acceService.BuscarRoles(id);
            return Ok(list);
        }

        [HttpPost("InsertarRolxPantalla")]
        public IActionResult InsertarRolxPantalla(PantallasPorRolesViewModel roles)
        {
            var item = _mapper.Map<VW_tbPantallasPorRoles>(roles);
            var response = _acceService.InsertarPantallasPorRoles(item);
            return Ok(response);
        }

        [HttpPut("EliminarRolxPantalla")]
        public IActionResult EliminarRolxPantalla(PantallasPorRolesViewModel roles)
        {
            var item = _mapper.Map<VW_tbPantallasPorRoles>(roles);
            var response = _acceService.EliminarPantallasPorRoles(item);
            return Ok(response);
        }
        [HttpGet("BuscarRolxPantalla")]
        public IActionResult FindRolxPantalla(int? id)
        {
            var list = _acceService.BuscarPantallasPorRoles(id);
            return Ok(list);
        }


    }
}
