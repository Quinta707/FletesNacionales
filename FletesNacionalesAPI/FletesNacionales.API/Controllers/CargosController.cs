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
    public class CargosController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;

        public CargosController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _gralService.ListadoCargos();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(CargosViewModel Pedidos)
        {
            var item = _mapper.Map<tbCargos>(Pedidos);
            var result = _gralService.EliminarCargos(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(CargosViewModel Pedidos)
        {
            var item = _mapper.Map<tbCargos>(Pedidos);
            var response = _gralService.InsertarCargos(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(CargosViewModel Pedidos)
        {
            var item = _mapper.Map<tbCargos>(Pedidos);
            var response = _gralService.EditarCargos(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _gralService.BuscarCargos(id);
            return Ok(list);
        }
    }
}
