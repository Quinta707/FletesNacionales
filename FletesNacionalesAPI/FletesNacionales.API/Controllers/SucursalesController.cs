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
    public class SucursalesController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public SucursalesController(FletService fletService, IMapper mapper)
        {
            _fletService = fletService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoSucursales();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(SucursalesViewModel sucursal)
        {
            var item = _mapper.Map<tbSucursales>(sucursal);
            var response = _fletService.InsertarSucursal(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(SucursalesViewModel sucursal)
        {
            var item = _mapper.Map<tbSucursales>(sucursal);
            var response = _fletService.EditarSucursal(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(SucursalesViewModel sucursal)
        {
            var item = _mapper.Map<tbSucursales>(sucursal);
            var result = _fletService.EliminarSucursal(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarSucursal(id);
            return Ok(list);
        }
    }
}
