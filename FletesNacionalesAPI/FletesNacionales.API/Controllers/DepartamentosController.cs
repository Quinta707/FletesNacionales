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
    public class DepartamentosController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;

        public DepartamentosController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _gralService.ListadoDepartamentos();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(DepartamentosViewModel Pedidos)
        {
            var item = _mapper.Map<tbDepartamentos>(Pedidos);
            var response = _gralService.InsertarDepartamentos(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(DepartamentosViewModel Pedidos)
        {
            var item = _mapper.Map<tbDepartamentos>(Pedidos);
            var response = _gralService.EditarDepartamentos(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(DepartamentosViewModel Pedidos)
        {
            var item = _mapper.Map<tbDepartamentos>(Pedidos);
            var result = _gralService.EliminarDepartamentos(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _gralService.BuscarDepartamentos(id);
            return Ok(list);
        }
    }
}
