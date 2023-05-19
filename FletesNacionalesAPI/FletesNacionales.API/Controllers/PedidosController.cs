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
    public class PedidosController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public PedidosController(FletService fletService, IMapper mapper)
        {
            _fletService = fletService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoPedidos();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(PedidosViewModel Pedidos)
        {
            var item = _mapper.Map<tbPedidos>(Pedidos);
            var response = _fletService.InsertarPedidos(item);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(PedidosViewModel Pedidos)
        {
            var item = _mapper.Map<tbPedidos>(Pedidos);
            var response = _fletService.EditarPedidos(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(PedidosViewModel Pedidos)
        {
            var item = _mapper.Map<tbPedidos>(Pedidos);
            var result = _fletService.EliminarPedidos(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarPedidos(id);
            return Ok(list);
        }
    }
}
