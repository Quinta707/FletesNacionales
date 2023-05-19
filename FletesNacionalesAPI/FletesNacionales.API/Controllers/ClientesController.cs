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

        [HttpPost("Eliminar")]
        public IActionResult Delete(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var result = _fletService.EliminarEmpleados(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var response = _fletService.InsertarEmpleados(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var response = _fletService.EditarEmpleados(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarEmpleados(id);
            return Ok(list);
        }
    }
}
