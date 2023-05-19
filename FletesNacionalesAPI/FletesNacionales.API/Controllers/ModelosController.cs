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
    public class ModelosController : ControllerBase
    {
        private readonly EquiService _equiService;
        private readonly IMapper _mapper;

        public ModelosController(EquiService equiService, IMapper mapper)
        {
            _equiService = equiService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _equiService.ListadoModelos();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(ModelosViewModel modelos)
        {
            var item = _mapper.Map<tbModelos>(modelos);
            var result = _equiService.EliminarModelos(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(ModelosViewModel modelos)
        {
            var item = _mapper.Map<tbModelos>(modelos);
            var response = _equiService.InsertarModelos(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(ModelosViewModel modelos)
        {
            var item = _mapper.Map<tbModelos>(modelos);
            var response = _equiService.EditarModelos(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _equiService.BuscarModelos(id);
            return Ok(list);
        }
    }
}
