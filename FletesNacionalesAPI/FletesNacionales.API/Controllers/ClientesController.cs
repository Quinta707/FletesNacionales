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
    public class ClientesController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public ClientesController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoClientes();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ClienteViewModel cliente)
        {
            var item = _mapper.Map<tbClientes>(cliente);
            var response = _fletService.InsertarClientes(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(ClienteViewModel cliente)
        {
            var item = _mapper.Map<tbClientes>(cliente);
            var response = _fletService.EditarClientes(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(ClienteViewModel cliente)
        {
            var item = _mapper.Map<tbClientes>(cliente);
            var result = _fletService.EliminarClientes(item);
            return Ok(result);
        }
    }
}
