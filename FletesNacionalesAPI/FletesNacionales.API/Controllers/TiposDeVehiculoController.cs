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
    public class TipoDeVehiculoController : ControllerBase
    {
        private readonly EquiService _equiService;
        private readonly IMapper _mapper;

        public TipoDeVehiculoController(EquiService equiService, IMapper mapper)
        {
            _equiService = equiService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _equiService.ListadoTipoDeVehiculo();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(TipoDeVehiculoViewModel tipovehiculo)
        {
            var item = _mapper.Map<tbTipoDeVehiculo>(tipovehiculo);
            var response = _equiService.InsertarTipoDeVehiculo(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(TipoDeVehiculoViewModel tipovehiculo)
        {
            var item = _mapper.Map<tbTipoDeVehiculo>(tipovehiculo);
            var response = _equiService.EditarTipoDeVehiculo(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(TipoDeVehiculoViewModel tipovehiculo)
        {
            var item = _mapper.Map<tbTipoDeVehiculo>(tipovehiculo);
            var result = _equiService.EliminarTipoDeVehiculo(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _equiService.BuscarTipoDeVehiculo(id);
            return Ok(list);
        }
    }
}
