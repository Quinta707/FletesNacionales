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
    public class EstadosCivilesController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _gralService.ListadoEstadosCiviles();
            return Ok(list);
        }
        [HttpPost("Eliminar")]
        public IActionResult Delete(EstadoCivilViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosCiviles>(Pedidos);
            var result = _gralService.EliminarEstadosCiviles(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EstadoCivilViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosCiviles>(Pedidos);
            var response = _gralService.InsertarEstadosCiviles(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EstadoCivilViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosCiviles>(Pedidos);
            var response = _gralService.EditarEstadosCiviles(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _gralService.BuscarEstadosCiviles(id);
            return Ok(list);
        }
    }
}
