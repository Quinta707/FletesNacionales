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
    public class VehiculosController : ControllerBase
    {
        private readonly EquiService _equiService;
        private readonly IMapper _mapper;

        public VehiculosController(EquiService equiService, IMapper mapper)
        {
            _equiService = equiService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _equiService.ListadoVehiculos();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(VehiculosViewModel vehiculos)
        {
            var item = _mapper.Map<tbVehiculos>(vehiculos);
            var response = _equiService.InsertarVehiculos(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(VehiculosViewModel vehiculos)
        {
            var item = _mapper.Map<tbVehiculos>(vehiculos);
            var response = _equiService.EditarVehiculos(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(VehiculosViewModel vehiculos)
        {
            var item = _mapper.Map<tbVehiculos>(vehiculos);
            var result = _equiService.EliminarVehiculos(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _equiService.BuscarVehiculos(id);
            return Ok(list);
        }
    }
}
