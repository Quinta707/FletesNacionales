using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;

namespace FletesNacionales.BusinessLogic.Services
{
    public class FletService
    {
        private readonly ClientesRepository _clientesRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly TrayectosRepository _trayectosRepository;
        private readonly FletesRepository _fletesRepository;
        private readonly ItemsRepository _itemsRepository;
        private readonly PedidosRepository _pedidosRepository;
        private readonly SucursalesRepository _sucursalesRepository;
        private readonly EstadoDelPedidoRepository _estadoDelPedidoRepository;
        private readonly PedidoDetallesRepository _pedidoDetallesRepository;

        public FletService(ClientesRepository clientesRepository,
                            EmpleadosRepository empleadosRepository,
                            TrayectosRepository trayectosRepository,
                            FletesRepository fletesRepository,
                            ItemsRepository itemsRepository,
                            PedidosRepository pedidosRepository,
                            SucursalesRepository sucursalesRepository,
                            EstadoDelPedidoRepository estadoDelPedidoRepository,
                            PedidoDetallesRepository pedidoDetallesRepository)
        {
            _clientesRepository = clientesRepository;
            _empleadosRepository = empleadosRepository;
            _trayectosRepository = trayectosRepository;
            _fletesRepository = fletesRepository;
            _itemsRepository = itemsRepository;
            _pedidosRepository = pedidosRepository;
            _sucursalesRepository = sucursalesRepository;
            _estadoDelPedidoRepository = estadoDelPedidoRepository;
            _pedidoDetallesRepository = pedidoDetallesRepository;
        }

        #region Pedidos
        public ServiceResult ListadoPedidos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pedidosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarPedidos(tbPedidos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidosRepository.Delete(item);
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

        public ServiceResult InsertarPedidos(tbPedidos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidosRepository.Insert(item);
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
        public ServiceResult EditarPedidos(tbPedidos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidosRepository.Update(item);
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

        public VW_tbPedidos BuscarPedidos(int? id)
        {
            try
            {
                var list = _pedidosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Trayectos
        public ServiceResult ListadoTrayectos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _trayectosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarTrayectos(tbTrayectos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _trayectosRepository.Delete(item);
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

        public ServiceResult InsertarTrayectos(tbTrayectos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _trayectosRepository.Insert(item);
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
        public ServiceResult EditarTrayectos(tbTrayectos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _trayectosRepository.Update(item);
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

        public VW_tbTrayectos BuscarTrayectos(int? id)
        {
            try
            {
                var list = _trayectosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region PedidosDetalle
        public ServiceResult ListadoPedidoDetalles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pedidoDetallesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarPedidoDetalles(tbPedidoDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidoDetallesRepository.Delete(item);
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

        public ServiceResult InsertarPedidoDetalles(tbPedidoDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidoDetallesRepository.Insert(item);
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
        public ServiceResult EditarPedidoDetalles(tbPedidoDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidoDetallesRepository.Update(item);
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

        public VW_tbPedidoDetalles BuscarPedidoDetalles(int? id)
        {
            try
            {
                var list = _pedidoDetallesRepository.find(id);
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
