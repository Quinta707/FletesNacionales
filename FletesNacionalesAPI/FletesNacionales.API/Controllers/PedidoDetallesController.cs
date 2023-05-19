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
    public class PedidoDetallesController : ControllerBase
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public PedidoDetallesController(FletService fletService, IMapper mapper)
        {
            _fletService = fletService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoPedidoDetalles();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(PedidoDetallesViewModel PedidoDetalles)
        {
            var item = _mapper.Map<tbPedidoDetalles>(PedidoDetalles);
            var result = _fletService.EliminarPedidoDetalles(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(PedidoDetallesViewModel PedidoDetalles)
        {
            var item = _mapper.Map<tbPedidoDetalles>(PedidoDetalles);
            var response = _fletService.InsertarPedidoDetalles(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(PedidoDetallesViewModel PedidoDetalles)
        {
            var item = _mapper.Map<tbPedidoDetalles>(PedidoDetalles);
            var response = _fletService.EditarPedidoDetalles(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarPedidoDetalles(id);
            return Ok(list);
        }
    }
}
