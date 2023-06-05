using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

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
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
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
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
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
                    return result.SetMessage("Eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == -3)
                    return result.SetMessage("EnUso", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public VW_tbClientes BuscarClientes(int? id)
        {
            try
            {
                var list = _clientesRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
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
        public ServiceResult ListadoEmpleadosConductores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.ListConductores();
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
                var insert = _empleadosRepository.Delete(item);

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

        public VW_tbEmpleados BuscarEmpleados(int id)
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
        
        public ServiceResult ListadoFletesPendientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListPendientes();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        
        public ServiceResult ListadoFletesTerminados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListTerminados();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult ListadoFletesEmpleado(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListEmpleado(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult ListadoFletesEmpleadoPendiente(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListEmpleadoPendiente(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult ListadoFletesEmpleadoEnProceso(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListEmpleadoEnProceso(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult ListadoFletesEmpleadoTerminado(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListEmpleadoTerminado(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult ListadoFletesEnProceso()
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.ListEnProceso();
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
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
                }
                else if (list.CodeStatus == -4)
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

        public ServiceResult InsertarFletesUbicacion(tbUbicacionPorFlete item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _fletesRepository.InsertUbicacion(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
                }
                else if (list.CodeStatus == -4)
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

        public ServiceResult VehiDisponible(int vehi_Id, string fechaSalida)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _fletesRepository.VehiDispo(vehi_Id, fechaSalida);
                if (list.CodeStatus == 1)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Error);
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
        
        public ServiceResult InsertarFletesDetalles(tbFleteDetalles item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _fletesRepository.DetallesInsert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
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
        public VW_tbFletes BuscarFlete(int? id)
        {
            try
            {
                var list = _fletesRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public IEnumerable<VW_tbTrayectos> GraficaFletes(VW_Grafica id)
        {
            try
            {
                var list = _fletesRepository.Grafica(id);
                return list;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public ServiceResult EmpezarFlete(tbFletes id)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _fletesRepository.EmpezarFlete(id);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Empezo", ServiceResultType.Success);
                else if (insert.CodeStatus == -5)
                    return result.SetMessage("PedidosPendientes", ServiceResultType.Error);
                else if (insert.CodeStatus == -6)
                    return result.SetMessage("PedidosSinTerminar", ServiceResultType.Error);
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
        public ServiceResult TerminarFlete(tbFletes id)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _fletesRepository.TerminarFlete(id);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Termino", ServiceResultType.Success);
                else if (insert.CodeStatus == -2)
                    return result.SetMessage("PedidosPendientes", ServiceResultType.Error);
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

        public ServiceResult FletePedidos(int flet_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _fletesRepository.PedidosFlete(flet_Id);
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

        public ServiceResult InsertarItems(tbItems item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _itemsRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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
                    return result.Ok(list);
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
                    return result.SetMessage("Eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == -3)
                    return result.SetMessage("EnUso", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public VW_tbItems BuscarItems(int? id)
        {
            try
            {
                var list = _itemsRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
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

        public ServiceResult EliminarSucursal(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalesRepository.Delete(item);
                if (map.CodeStatus == 1)
                    return result.SetMessage("Eliminado", ServiceResultType.Success);
                else if (map.CodeStatus == -3)
                    return result.SetMessage("EnUso", ServiceResultType.Success);
                else if (map.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarSucursal(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalesRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
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
        public ServiceResult EditarSucursal(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalesRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
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

        public VW_tbSucursales BuscarSucursal(int? id)
        {
            try
            {
                var list = _sucursalesRepository.find(id);
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
                else if (map.CodeStatus == -3)
                {
                    return result.SetMessage("EnUso", ServiceResultType.Conflict);
                }
                else if (map.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
            }
            catch (Exception e)
            {
                return result.Error(e.Message); 
            }
        }

        public ServiceResult InsertarTrayectos(tbTrayectos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _trayectosRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
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
                else if (map.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (map.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
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

        public VW_tbTrayectos ExisteTrayecto(string desde, string hasta)
        {
            try
            {
                var list = _trayectosRepository.Exists(desde, hasta);
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

        public IEnumerable<VW_tbPedidos> ListarPedidos(int id)
        {
            try
            {
                return _pedidosRepository.ListarPedidos(id);
            }
            catch (Exception e)
            {
                string message = e.Message;
                return Enumerable.Empty<VW_tbPedidos>();
            }
        }

        public ServiceResult PedidosPorMunicipio(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pedidosRepository.PedidosPorMunicipio(id);
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
        public ServiceResult EditarPedidosEstado(tbPedidos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _pedidosRepository.UpdateEstado(item);
                if (map.CodeStatus == 1)
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                else if (map.CodeStatus == -2)
                    return result.SetMessage("NoEsPosible", ServiceResultType.Error);
                else if (map.CodeStatus == 0)
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
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

       

    }
}
