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
    public class ItemsController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public ItemsController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoItems();
            return Ok(list);
        }


        [HttpPost("Insertar")]
        public IActionResult Insertar(ItemsViewModel Items)
        {
            var item = _mapper.Map<tbItems>(Items);
            var response = _fletService.InsertarItems(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(ItemsViewModel items)
        {
            var item = _mapper.Map<tbItems>(items);
            var response = _fletService.EditarItems(item);
            return Ok(response);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(ItemsViewModel items)
        {
            var item = _mapper.Map<tbItems>(items);
            var result = _fletService.EliminarItems(item);
            return Ok(result);
        }
        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarClientes(id);
            return Ok(list);
        }
    }
}

