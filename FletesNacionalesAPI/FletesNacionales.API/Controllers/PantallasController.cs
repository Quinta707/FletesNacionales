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
        [HttpGet("Listado")]
        public IActionResult List()
        { 
            var list = _acceService.ListadoPantallas();
            return Ok(list);
        }
    }
}
