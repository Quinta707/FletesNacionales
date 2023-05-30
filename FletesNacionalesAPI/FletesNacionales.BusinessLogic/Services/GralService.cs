using FletesNacionales.DataAccess.Repository;

namespace FletesNacionales.BusinessLogic.Services
{
    public class GralService
    {

        private readonly CargosRepository _cargosRespository;
        private readonly DepartamentosRepository _departamentosRepository;
        private readonly MunicipiosRepository _municipiosRepository;
        private readonly EstadosCivilesRepository _estadosCivilesRepository;
        private readonly MetodosDePagoRepository _metodosDePagoRepository;

        public GralService(CargosRepository cargosRepository,
                            DepartamentosRepository departamentosRepository,
                            MunicipiosRepository municipiosRepository,
                            EstadosCivilesRepository estadosCivilesRepository,
                            MetodosDePagoRepository metodosDePagoRepository)
        {
            _cargosRespository = cargosRepository;
            _departamentosRepository = departamentosRepository;
            _municipiosRepository = municipiosRepository;
            _estadosCivilesRepository = estadosCivilesRepository;
            _metodosDePagoRepository = metodosDePagoRepository;
        }

    }
}