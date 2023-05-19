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
    public class TrayectosController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public TrayectosController(FletService fletService, IMapper mapper)
        {
            _fletService = fletService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoTrayectos();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(TrayectosViewModel Trayectos)
        {
            var item = _mapper.Map<tbTrayectos>(Trayectos);
            var result = _fletService.EliminarTrayectos(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(TrayectosViewModel Trayectos)
        {
            var item = _mapper.Map<tbTrayectos>(Trayectos);
            var response = _fletService.InsertarTrayectos(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(TrayectosViewModel Trayectos)
        {
            var item = _mapper.Map<tbTrayectos>(Trayectos);
            var response = _fletService.EditarTrayectos(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarTrayectos(id);
            return Ok(list);
        }
    }
}
