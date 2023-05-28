using Agence.BusinessLogic;
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
    public class FletesController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public FletesController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoFletes();
            return Ok(list);
        }
        [HttpGet("ListadoPendientes")]
        public IActionResult ListPendientes()
        {
            var list = _fletService.ListadoFletesPendientes();
            return Ok(list);
        }
        [HttpGet("ListadoTerminados")]
        public IActionResult LisTerminados()
        {
            var list = _fletService.ListadoFletesTerminados();
            return Ok(list);
        }
        [HttpGet("ListadoEnProceso")]
        public IActionResult ListEnProceso()
        {
            var list = _fletService.ListadoFletesEnProceso();
            return Ok(list);
        }
        [HttpGet("ListadoEmpleado")]
        public IActionResult ListEmpleado(int id)
        {
            var list = _fletService.ListadoFletesEmpleado(id);
            return Ok(list);
        }

        [HttpGet("ListadoEmpleadoPendientes")]
        public IActionResult ListEmpleadoPendiente(int id)
        {
            var list = _fletService.ListadoFletesEmpleadoPendiente(id);
            return Ok(list);
        }

        [HttpGet("ListadoEmpleadoTerminado")]
        public IActionResult ListEmpleadoTerminado(int id)
        {
            var list = _fletService.ListadoFletesEmpleadoTerminado(id);
            return Ok(list);
        }

        [HttpGet("ListadoEmpleadoEnProceso")]
        public IActionResult ListEmpleadoEnProceso(int id)
        {
            var list = _fletService.ListadoFletesEmpleadoEnProceso(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(FletesViewModel flete)
        {
            var item = _mapper.Map<tbFletes>(flete);
            var response = _fletService.InsertarFletes(item);
            return Ok(response);
        }

         [HttpGet("VehiculoDisponible")]
        public IActionResult VehiDispo(int vehi_Id, string fechaSalida)
        {
            var response = _fletService.VehiDisponible(vehi_Id, fechaSalida);
            return Ok(response);
        }

        [HttpPut("Editar")]
        public IActionResult Update(FletesViewModel flete)
        {
            var item = _mapper.Map<tbFletes>(flete);
            var response = _fletService.EditarFletes(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(FletesViewModel flete)
        {
            var item = _mapper.Map<tbFletes>(flete);
            var result = _fletService.EliminarFlete(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _fletService.BuscarFlete(id);
            return Ok(list);
        }

        [HttpPost("Empezar")]
        public IActionResult Empezar(FletesViewModel flete)
        {
            var item = _mapper.Map<tbFletes>(flete);
            var response = _fletService.EmpezarFlete(item);
            return Ok(response);
        }

        [HttpGet("FleteDetalles")]
        public IActionResult FleteDetalles(int flet_Id)
        {
            var response = _fletService.FletePedidos(flet_Id);
            return Ok(response);
        }

        [HttpPost("InsertarDetalles")]
        public IActionResult InsertDetalles(FletesViewModel flete)
        {
            ServiceResult response = new();

            foreach (var itemr in flete.pedidosArray)
            {
                flete.pedi_Id = itemr;
                var item = _mapper.Map<tbFleteDetalles>(flete);
                response = _fletService.InsertarFletesDetalles(item);
            }

                return Ok(response);

        }

    }
}
