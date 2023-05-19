﻿using AutoMapper;
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

        [HttpPost("Insertar")]
        public IActionResult Insert(FletesViewModel flete)
        {
            var item = _mapper.Map<tbFletes>(flete);
            var response = _fletService.InsertarFletes(item);
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
    }
}
