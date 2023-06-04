using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
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

        #region Marcas

        public ServiceResult ListadoMarcas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Delete(item);
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

        public ServiceResult InsertarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Insert(item);
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
        public ServiceResult EditarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Update(item);
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

        public VW_tbMarcas BuscarMarcas(int? id)
        {
            try
            {
                var list = _marcasRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Modelos

        public ServiceResult ListadoModelos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _modelosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modelosRepository.Delete(item);
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

        public ServiceResult InsertarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modelosRepository.Insert(item);
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
        public ServiceResult EditarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modelosRepository.Update(item);
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

        public VW_tbModelos BuscarModelos(int? id)
        {
            try
            {
                var list = _modelosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Tipo de vehiculo

        public ServiceResult ListadoTipoDeVehiculo()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tiposDeVehiculosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarTipoDeVehiculo(tbTipoDeVehiculo item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeVehiculosRepository.Delete(item);
                if (map.CodeStatus == 1)
                {
                    return result.Ok(map);
                }
                else if (map.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public ServiceResult InsertarTipoDeVehiculo(tbTipoDeVehiculo item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeVehiculosRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else if (map.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (map.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ServiceResult EditarTipoDeVehiculo(tbTipoDeVehiculo item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeVehiculosRepository.Update(item);
                if (map.CodeStatus == 1)
                {
                    return result.Ok(map);
                }
                else if (map.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (map.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {
                return result.Error(xe.Message);
            }
        }

        public VW_tbTipoDeVehiculo BuscarTipoDeVehiculo(int? id)
        {
            try
            {
                var list = _tiposDeVehiculosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Vehiculos

        public ServiceResult ListadoVehiculos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _vehiculosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _vehiculosRepository.Delete(item);
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

        public ServiceResult InsertarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _vehiculosRepository.Insert(item);
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
        public ServiceResult EditarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _vehiculosRepository.Update(item);
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

        public VW_tbVehiculos BuscarVehiculos(int? id)
        {
            try
            {
                var list = _vehiculosRepository.find(id);
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
