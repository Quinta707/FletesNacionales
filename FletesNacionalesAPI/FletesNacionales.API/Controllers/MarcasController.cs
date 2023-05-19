using AutoMapper;
using FletesNacionales.API.Models;
using FletesNacionales.BusinessLogic.Services;
using FletesNacionales.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly EquiService _equiService;
        private readonly IMapper _mapper;

        public MarcasController(EquiService equiService, IMapper mapper)
        {
            _equiService = equiService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _equiService.ListadoMarcas();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(MarcasViewModel marcas)
        {
            var item = _mapper.Map<tbMarcas>(marcas);
            var result = _equiService.EliminarMarcas(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MarcasViewModel marcas)
        {
            var item = _mapper.Map<tbMarcas>(marcas);
            var response = _equiService.InsertarMarcas(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(MarcasViewModel marcas)
        {
            var item = _mapper.Map<tbMarcas>(marcas);
            var response = _equiService.EditarMarcas(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _equiService.BuscarMarcas(id);
            return Ok(list);
        }
    }
}
