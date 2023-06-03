namespace FletesNacionales.DataAccess.Repository
{
    public class ScriptsDataBase
    {

        #region Acce

        #region Usuarios

        public static string UsuraiosFind = "acce.UDP_tbUsuarios_Find";
        public static string UsuraiosIndex = "acce.UDP_tbUsuarios_Index";
        public static string UsuraiosInsert = "acce.UDP_tbUsuarios_Insert";
        public static string UsuraiosUpdate = "acce.UDP_tbUsuarios_Update";
        public static string UsuraiosDelete = "acce.UDP_tbUsuarios_Delete";

        public static string UsuraiosLogin = "acce.UDP_Login";
        #endregion

        #region Roles

        public static string RolesFind = "acce.UDP_tbRoles_Find";
        public static string RolesIndex = "acce.UDP_tbRoles_Index";
        public static string RolesInsert = "acce.UDP_tbRoles_Insert";
        public static string RolesUpdate = "acce.UDP_tbRoles_Update";
        public static string RolesDelete = "acce.UDP_tbRoles_Delete";


        #endregion

        #region

        public static string PantallasFind = "acce.UDP_tbPantallas_Find";
        public static string PantallasIndex = "acce.UDP_tbPantallas_Index";
        public static string PantallasInsert = "acce.UDP_tbPantallas_Insert";
        public static string PantallasUpdate = "acce.UDP_tbPantallas_Update";
        public static string PantallasDelete = "acce.UDP_tbPantallas_Delete";

        public static string PantallaXRolesInsert = "acce.UDP_tbPantallasPorRoles_Insert";
        public static string PantallaXRolesDelete = "acce.UDP_tbPantallasPorRoles_Delete";
        public static string PantallaXRolesFind = "acce.UDP_tbPantallasPorRoles_Find";
        public static string PantallaXRolesIndex = "acce.UDP_tbPantallasPorRoles_Index";
        public static string PantallasXRolesMenu = "acce.tbRolesPorPantallaMenu";
        #endregion

        #endregion

        #region Gral

        #region Cargos

        public static string CargosFind = "gral.UDP_tbCargos_Find";
        public static string CargosIndex = "gral.UDP_tbCargos_Index";
        public static string CargosInsert = "gral.UDP_tbCargos_Insert";
        public static string CargosUpdate = "gral.UDP_tbCargos_Update";
        public static string CargosDelete = "gral.UDP_tbCargos_Delete";

        #endregion

        #region Departamentos

        public static string DepartamentosFind = "gral.UDP_tbDepartamentos_Find";
        public static string DepartamentosIndex = "gral.UDP_tbDepartamentos_Index";
        public static string DepartamentosInsert = "gral.UDP_tbDepartamentos_Insert";
        public static string DepartamentosUpdate = "gral.UDP_tbDepartamentos_Update";
        public static string DepartamentosDelete = "gral.UDP_tbDepartamentos_Delete";

        #endregion

        #region Municipios

        public static string MunicipiosFind = "gral.UDP_tbMunicipios_Find";
        public static string MunicipiosIndex = "gral.UDP_tbMunicipios_Index";
        public static string MunicipiosInsert = "gral.UDP_tbMunicipios_Insert";
        public static string MunicipiosUpdate = "gral.UDP_tbMunicipios_Update";
        public static string MunicipiosDelete = "gral.UDP_tbMunicipios_Delete";


        #endregion

        #region Estados Civiles
        #endregion

        public static string EstadosCivileseFind = "gral.UDP_tbEstadosCiviles_Find";
        public static string EstadosCivileseIndex = "gral.UDP_tbEstadosCiviles_Index";
        public static string EstadosCivileseInsert = "gral.UDP_tbEstadosCiviles_Insert";
        public static string EstadosCivileseUpdate = "gral.UDP_tbEstadosCiviles_Update";
        public static string EstadosCivileseDelete = "gral.UDP_tbEstadosCiviles_Delete";

        #region Metodos De Pago

        public static string MetodosdePagoFind = "gral.UDP_tbMetodosdePago_Find";
        public static string MetodosdePagoIndex = "gral.UDP_tbMetodosdePago_Index";
        public static string MetodosdePagoInsert = "gral.UDP_tbMetodosdePago_Insert";
        public static string MetodosdePagoUpdate = "gral.UDP_tbMetodosdePago_Update";
        public static string MetodosdePagoDelete = "gral.UDP_tbMetodosdePago_Delete";

        #endregion

        #endregion

        #region Flet

        #region Clientes

        public static string ClientesFind = "flet.UDP_tbClientes_Find";
        public static string ClientesIndex = "flet.UDP_tbClientes_Index";
        public static string ClientesInsert = "flet.UDP_tbClientes_Insert";
        public static string ClientesUpdate = "flet.UDP_tbClientes_Update";
        public static string ClientesDelete = "flet.UDP_tbClientes_Delete";

        #endregion

        #region Empleados

        public static string EmpleadosFind = "flet.UDP_tbEmpleados_Find";
        public static string EmpleadosIndex = "flet.UDP_tbEmpleados_Index";
        public static string EmpleadosIndexConductores = "flet.UDP_tbEmpleados_IndexConductores";
        public static string EmpleadosInsert = "flet.UDP_tbEmpleados_Insert";
        public static string EmpleadosUpdate = "flet.UDP_tbEmpleados_Update";
        public static string EmpleadosDelete = "flet.UDP_tbEmpleados_Delete";

        #endregion

        #region Trayectos

        public static string TrayectosFind = "flet.UDP_tbTrayectos_Find";
        public static string TrayectosIndex = "flet.UDP_tbTrayectos_Index";
        public static string TrayectosInsert = "flet.UDP_tbTrayectos_Insert";
        public static string TrayectosUpdate = "flet.UDP_tbTrayectos_Update";
        public static string TrayectosDelete = "flet.UDP_tbTrayectos_Delete";
        public static string TrayectosExiste = "flet.UDP_tbTrayectos_Existe";

        #endregion

        #region Fletes

        public static string FletesFind = "flet.UDP_tbFletes_Find";
        public static string FletesIndex = "flet.UDP_tbFletes_Index";
        public static string FletesIndexPendientes = "flet.UDP_tbFletes_IndexPendientes";
        public static string FletesIndexTermiandos = "flet.UDP_tbFletes_IndexTerminados";
        public static string FletesIndexEnProcesp = "flet.UDP_tbFletes_IndexEnProceso";
        public static string FletesInsert = "flet.UDP_tbFletes_Insert";
        public static string FletesUpdate = "flet.UDP_tbFletes_Update";
        public static string FletesDelete = "flet.UDP_tbFletes_Delete";
        public static string FletesEmpezar = "flet.UDP_tbFletes_Empezar";
        public static string FletesTerminar = "flet.UDP_tbFletes_Terminar";
        public static string FletesPedidos = "flet.UDP_tbFletes_PedidosPorFlete";
        public static string FletesVehiDisponible = "flet.UDP_tbFletes_VehiculoAsignado";
        public static string FletesIndexEmpleado = "flet.UDP_tbFletes_IndexPorEmpleado";
        public static string FletesIndexEmpleadoPendiente = "flet.UDP_tbFletes_IndexPorEmpleadoPedientes";
        public static string FletesIndexEmpleadoEnProceso = "flet.UDP_tbFletes_IndexPorEmpleadoEnProceso";
        public static string FletesIndexEmpleadoTerminado = "flet.UDP_tbFletes_IndexPorEmpleadoTerminados";


        public static string FletesDetallesFind = "flet.UDP_tbFleteDetalles_Find";
        public static string FletesDetallesFindxFlete = "flet.UDP_tbFleteDetalles_FindxFlete";
        public static string FletesDetallesIndex = "flet.UDP_tbFleteDetalles_Index";
        public static string FletesDetallesInsert = "flet.UDP_tbFleteDetalles_Insert";
        public static string FletesDetallesUpdate = "flet.UDP_tbFleteDetalles_Update";
        public static string FletesDetallesDelete = "flet.UDP_tbFleteDetalles_Delete";



        public static string FleteUbicacionInsert = "flet.UDP_tbUbicacionPorFlete_Insert";
        #endregion

        #region Items

        public static string ItemsFind = "flet.UDP_tbItems_Find";
        public static string ItemsIndex = "flet.UDP_tbItems_Index";
        public static string ItemsInsert = "flet.UDP_tbItems_Insert";
        public static string ItemsUpdate = "flet.UDP_tbItems_Update";
        public static string ItemsDelete = "flet.UDP_tbItems_Delete";
        #endregion

        #region Pedidos

        public static string PedidosFind = "flet.UDP_tbPedidos_Find";
        public static string PedidosIndex = "flet.UDP_tbPedidos_Index";
        public static string PedidosInsert = "flet.UDP_tbPedidos_Insert";
        public static string PedidosUpdate = "flet.UDP_tbPedidos_Update";
        public static string PedidosUpdateEstado = "flet.UDP_tbPedidos_UpdateEstado";
        public static string PedidosDelete = "flet.UDP_tbPedidos_Delete";
        public static string PedidosPorMunicipio = "flet.UDP_tbPedidos_PedidosPorMunicipio";

        #endregion

        #region Sucursales

        public static string SucursalesFind = "flet.UDP_tbSucursales_Find";
        public static string SucursalesIndex = "flet.UDP_tbSucursales_Index";
        public static string SucursalesInsert = "flet.UDP_tbSucursales_Insert";
        public static string SucursalesUpdate = "flet.UDP_tbSucursales_Update";
        public static string SucursalesDelete = "flet.UDP_tbSucursales_Delete";

        #endregion

        #region Estados Del Pedido

        public static string EstadosDelPedidoFind = "flet.UDP_tbEstadosDelPedido_Find";
        public static string EstadosDelPedidoIndex = "flet.UDP_tbEstadosDelPedido_Index";
        public static string EstadosDelPedidoInsert = "flet.UDP_tbEstadosDelPedido_Insert";
        public static string EstadosDelPedidoUpdate = "flet.UDP_tbEstadosDelPedido_Update";
        public static string EstadosDelPedidoDelete = "flet.UDP_tbEstadosDelPedido_Delete";

        #endregion

        #region PedidoDetalles

        public static string PedidoDetallesFind = "flet.UDP_tbPedidoDetalles_Find";
        public static string PedidoDetallesIndex = "flet.UDP_tbPedidoDetalles_Index";
        public static string PedidoDetallesInsert = "flet.UDP_tbPedidoDetalles_Insert";
        public static string PedidoDetallesUpdate = "flet.UDP_tbPedidoDetalles_Update";
        public static string PedidoDetallesDelete = "flet.UDP_tbPedidoDetalles_Delete";

        #endregion

        #endregion

        #region Equi

        #region Marcas

        public static string MarcasFind = "equi.UDP_tbMarcas_Find";
        public static string MarcasIndex = "equi.UDP_tbMarcas_Index";
        public static string MarcasInsert = "equi.UDP_tbMarcas_Insert";
        public static string MarcasUpdate = "equi.UDP_tbMarcas_Update";
        public static string MarcasDelete = "equi.UDP_tbMarcas_Delete";

        #endregion

        #region Modelos

        public static string ModelosFind = "equi.UDP_tbModelos_Find";
        public static string ModelosIndex = "equi.UDP_tbModelos_Index";
        public static string ModelosInsert = "equi.UDP_tbModelos_Insert";
        public static string ModelosUpdate = "equi.UDP_tbModelos_Update";
        public static string ModelosDelete = "equi.UDP_tbModelos_Delete";

        #endregion

        #region Tipos de Vehiculos

        public static string TipoDeVehiculoFind = "equi.UDP_tbTipoDeVehiculo_Find";
        public static string TipoDeVehiculoIndex = "equi.UDP_tbTipoDeVehiculo_Index";
        public static string TipoDeVehiculoInsert = "equi.UDP_tbTipoDeVehiculo_Insert";
        public static string TipoDeVehiculoUpdate = "equi.UDP_tbTipoDeVehiculo_Update";
        public static string TipoDeVehiculoDelete = "equi.UDP_tbTipoDeVehiculo_Delete";

        #endregion

        #region Vehiculos

        public static string VehiculosFind = "equi.UDP_tbVehiculos_Find";
        public static string VehiculosIndex = "equi.UDP_tbVehiculos_Index";
        public static string VehiculosInsert = "equi.UDP_tbVehiculos_Insert";
        public static string VehiculosUpdate = "equi.UDP_tbVehiculos_Update";
        public static string VehiculosDelete = "equi.UDP_tbVehiculos_Delete";

        #endregion

        #endregion

    }
}
