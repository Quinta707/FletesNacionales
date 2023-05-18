using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
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
