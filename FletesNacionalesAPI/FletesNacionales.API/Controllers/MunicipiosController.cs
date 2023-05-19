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
    public class MunicipiosController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;

        public MunicipiosController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _gralService.ListadoMunicipios();
            return Ok(list);

        }
        [HttpPost("Eliminar")]
        public IActionResult Delete(MunicipiosViewModel Pedidos)
        {
            var item = _mapper.Map<tbMunicipios>(Pedidos);
            var result = _gralService.EliminarMunicipio(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MunicipiosViewModel Pedidos)
        {
            var item = _mapper.Map<tbMunicipios>(Pedidos);
            var response = _gralService.InsertarMunicipio(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(MunicipiosViewModel Pedidos)
        {
            var item = _mapper.Map<tbMunicipios>(Pedidos);
            var response = _gralService.EditarMunicipio(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _gralService.BuscarMunicipio(id);
            return Ok(list);
        }
    }
}
