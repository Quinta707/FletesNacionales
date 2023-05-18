using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using System;

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

        #region cargos
        public ServiceResult ListadoCargos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargosRespository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion
        
        #region Departamentos
        public ServiceResult ListadoDepartamentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion
        #region Municipios
        public ServiceResult ListadoMunicipios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipiosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion
        #region EstadosCiviles
        public ServiceResult ListadoEstadosCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadosCivilesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion
        #region EstadosCiviles
        public ServiceResult ListadoMetodosPago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _metodosDePagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion


    }
}