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
    public class EmpleadosController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public EmpleadosController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoEmpleados();
            return Ok(list);
        }

        [HttpGet("ListadoConductores")]
        public IActionResult ListConductores()
        {
            var list = _fletService.ListadoEmpleadosConductores();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var response = _fletService.InsertarEmpleados(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var response = _fletService.EditarEmpleados(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(EmpleadoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEmpleados>(Pedidos);
            var result = _fletService.EliminarEmpleados(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int id)
        {
            var list = _fletService.BuscarEmpleados(id);
            return Ok(list);
        }
    }
}
