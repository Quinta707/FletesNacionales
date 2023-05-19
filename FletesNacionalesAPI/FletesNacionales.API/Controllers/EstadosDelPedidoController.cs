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
    public class EstadosDelPedidoController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public EstadosDelPedidoController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoEstadoDelPedido();
            return Ok(list);
        }
        [HttpPost("Eliminar")]
        public IActionResult Delete(EstadoDelPedidoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosDelPedido>(Pedidos);
            var result = _fletService.EliminarEstadoDelPedido(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EstadoDelPedidoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosDelPedido>(Pedidos);
            var response = _fletService.InsertarEstadoDelPedido(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EstadoDelPedidoViewModel Pedidos)
        {
            var item = _mapper.Map<tbEstadosDelPedido>(Pedidos);
            var response = _fletService.EditarEstadoDelPedido(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarEstadoDelPedido(id);
            return Ok(list);
        }
    }
}
