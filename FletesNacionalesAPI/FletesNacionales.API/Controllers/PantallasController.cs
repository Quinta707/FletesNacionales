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
    public class PantallasController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;

        public PantallasController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(PantallasPorRolesViewModel panxrol)
        {
            ServiceResult list = new();
            foreach (var item2 in panxrol.pantallas)
            {
                panxrol.pant_Id = item2;
                var item = _mapper.Map<tbPantallasPorRoles>(panxrol);
                list = _acceService.InsertarPantallasPorRoles(item);

            }
            return Ok(list);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(PantallasPorRolesViewModel roles)
        {
            var item = _mapper.Map<tbPantallasPorRoles>(roles);
            var result = _acceService.EliminarPantallasPorRoles(item);
            return Ok(result);
        }
    }
}
