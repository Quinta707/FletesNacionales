using FletesNacionales.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.BusinessLogic.Services
{
    public class EquiService
    {
        private readonly MarcasRepository _marcasRepository;
        private readonly ModelosRepository _modelosRepository;
        private readonly TiposDeVehiculosRepository _tiposDeVehiculosRepository;
        private readonly VehiculosRepository _vehiculosRepository;

        public EquiService(MarcasRepository marcasRepository,
                            ModelosRepository modelosRepository,
                            TiposDeVehiculosRepository tiposDeVehiculosRepository,
                            VehiculosRepository vehiculosRepository)
        {
            _marcasRepository = marcasRepository;
            _modelosRepository = modelosRepository;
            _tiposDeVehiculosRepository = tiposDeVehiculosRepository;
            _vehiculosRepository = vehiculosRepository;
        }

    }
}
