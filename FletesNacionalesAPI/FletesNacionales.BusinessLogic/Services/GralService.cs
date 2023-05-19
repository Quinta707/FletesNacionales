using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
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
        public ServiceResult EliminarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRespository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRespository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRespository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public VW_tbCargos BuscarCargos(int? id)
        {
            try
            {
                var list = _cargosRespository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
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

        public ServiceResult EliminarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public VW_tbDepartamentos BuscarDepartamentos(int? id)
        {
            try
            {
                var list = _departamentosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
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

        public ServiceResult EliminarMunicipio(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipiosRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarMunicipio(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipiosRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarMunicipio(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipiosRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public VW_tbMunicipios BuscarMunicipio(int? id)
        {
            try
            {
                var list = _municipiosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
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
        public ServiceResult EliminarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadosCivilesRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadosCivilesRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadosCivilesRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public VW_tbEstadosCiviles BuscarEstadosCiviles(int? id)
        {
            try
            {
                var list = _estadosCivilesRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion
        #region Metodo De Pago
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
        public ServiceResult EliminarMetodosdePago(tbMetodosdePago item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _metodosDePagoRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarMetodosdePago(tbMetodosdePago item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _metodosDePagoRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarMetodosdePago(tbMetodosdePago item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _metodosDePagoRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public VW_tbMetodosdePago BuscarMetodosdePago(int? id)
        {
            try
            {
                var list = _metodosDePagoRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


    }
}