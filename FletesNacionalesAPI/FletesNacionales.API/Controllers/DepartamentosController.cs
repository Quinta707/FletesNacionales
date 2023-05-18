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
    }
}
