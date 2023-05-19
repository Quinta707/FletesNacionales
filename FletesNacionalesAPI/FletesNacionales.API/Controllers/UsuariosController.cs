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
    public class UsuariosController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;

        public UsuariosController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _acceService.ListadoUsuarios();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult InsertarSucursal(UsuariosViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var response = _acceService.InsertarUsuarios(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(UsuariosViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var result = _acceService.EditarUsuarios(item);
            return Ok(result);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(UsuariosViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var result = _acceService.EliminarUsuarios(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _acceService.BuscarUsuario(id);
            return Ok(list);
        }

    }
}
