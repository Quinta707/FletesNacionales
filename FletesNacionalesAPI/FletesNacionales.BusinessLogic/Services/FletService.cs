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

        public FletService(ClientesRepository clientesRepository,
                            EmpleadosRepository empleadosRepository,
                            TrayectosRepository trayectosRepository,
                            FletesRepository fletesRepository,
                            ItemsRepository itemsRepository,
                            PedidosRepository pedidosRepository,
                            SucursalesRepository sucursalesRepository,
                            EstadoDelPedidoRepository estadoDelPedidoRepository)
        {
            _clientesRepository = clientesRepository;
            _empleadosRepository = empleadosRepository;
            _trayectosRepository = trayectosRepository;
            _fletesRepository = fletesRepository;
            _itemsRepository = itemsRepository;
            _pedidosRepository = pedidosRepository;
            _sucursalesRepository = sucursalesRepository;
            _estadoDelPedidoRepository = estadoDelPedidoRepository;
        }

        #region Clientes
        public ServiceResult ListadoClientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clientesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarClientes(tbClientes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _clientesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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

        public ServiceResult EditarClientes(tbClientes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _clientesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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


        public ServiceResult EliminarClientes(tbClientes id)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _clientesRepository.Delete(id);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
        #region Empleados
        public ServiceResult ListadoEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult EliminarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Delete(item);
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

        public ServiceResult InsertarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Insert(item);
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
        public ServiceResult EditarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Update(item);
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

        public VW_tbEmpleados BuscarEmpleados(int? id)
        {
            try
            {
                var list = _empleadosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion
        #region Estados del pedido
        public ServiceResult ListadoEstadoDelPedido()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoDelPedidoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult EliminarEstadoDelPedido(tbEstadosDelPedido item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoDelPedidoRepository.Delete(item);
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

        public ServiceResult InsertarEstadoDelPedido(tbEstadosDelPedido item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoDelPedidoRepository.Insert(item);
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
        public ServiceResult EditarEstadoDelPedido(tbEstadosDelPedido item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoDelPedidoRepository.Update(item);
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

        public VW_tbEstadosDelPedido BuscarEstadoDelPedido(int? id)
        {
            try
            {
                var list = _estadoDelPedidoRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion
        #region Fletes
        public ServiceResult ListadoFletes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarFletes(tbFletes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _fletesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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
        
        public ServiceResult EditarFletes(tbFletes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _fletesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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

        public ServiceResult EliminarFlete(tbFletes id)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _fletesRepository.Delete(id);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
        #region Items
        public ServiceResult ListadoItems()
        {
            var result = new ServiceResult();
            try
            {
                var list = _itemsRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarItems(tbItems item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _itemsRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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

        public ServiceResult EditarItems(tbItems item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _itemsRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
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


        public ServiceResult EliminarItems(tbItems id)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _itemsRepository.Delete(id);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
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
        #endregion
        #region Sucursales
        public ServiceResult ListadoSucursales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
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
        #endregion

    }
}
