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
    public class MetodosPagoController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;

        public MetodosPagoController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _gralService.ListadoMetodosPago();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MetodoDePagoViewModel metodo)
        {
            var item = _mapper.Map<tbMetodosdePago>(metodo);
            var response = _gralService.InsertarMetodosdePago(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(MetodoDePagoViewModel metodo)
        {
            var item = _mapper.Map<tbMetodosdePago>(metodo);
            var response = _gralService.EditarMetodosdePago(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(MetodoDePagoViewModel metodo)
        {
            var item = _mapper.Map<tbMetodosdePago>(metodo);
            var result = _gralService.EliminarMetodosdePago(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _gralService.BuscarMetodosdePago(id);
            return Ok(list);
        }
    }
}
