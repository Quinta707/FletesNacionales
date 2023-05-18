using AutoMapper;
using FletesNacionales.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : Controller
    {
        private readonly FletService _fletService;
        private readonly IMapper _mapper;

        public EmpleadosController(FletService gralService, IMapper mapper)
        {
            _fletService = gralService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _fletService.ListadoEmpleados();
            return Ok(list);
        }
    }
}
