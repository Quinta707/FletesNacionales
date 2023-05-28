using Agence.DataAccess.Repository;
using Dapper;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class FletesRepository : IRepository<tbFletes, VW_tbFletes>
    {
        public RequestStatus Delete(tbFletes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", item.flet_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        public RequestStatus DetallesDelete(tbFleteDetalles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fdet_Id", item.fdet_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesDetallesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public VW_tbFletes find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbFletes>(ScriptsDataBase.FletesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

    public RequestStatus Insert(tbFletes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_Id", item.vehi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tray_Id", item.tray_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@flet_FechaDeSalida", item.flet_FechaDeSalida, DbType.Date, ParameterDirection.Input);
            parametros.Add("@flet_UsuCreacion", item.flet_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
    public RequestStatus VehiDispo(int vehi_Id, string fechaSalida)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_Id", vehi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@flet_FechaDeSalida", fechaSalida, DbType.Date, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesVehiDisponible, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        public RequestStatus DetallesInsert(tbFleteDetalles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", item.flet_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fdet_UsuCreacion", item.fdet_UsuCreacion, DbType.Int32, ParameterDirection.Input);
           result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesDetallesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        public IEnumerable<VW_tbFletes> ListEmpleado(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexEmpleado, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListEmpleadoPendiente(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexEmpleadoPendiente, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListEmpleadoEnProceso(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexEmpleadoEnProceso, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListEmpleadoTerminado(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexEmpleadoTerminado, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListPendientes()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexPendientes, null, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListTerminados()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexTermiandos, null, commandType: System.Data.CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbFletes> ListEnProceso()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndexEnProcesp, null, commandType: System.Data.CommandType.StoredProcedure);
        }
        
        public IEnumerable<VW_tbFleteDetalles> ListDetallesxFlete(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbFleteDetalles>(ScriptsDataBase.FletesDetallesFindxFlete, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFletes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", item.flet_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_Id", item.vehi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tray_Id", item.tray_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@flet_FechaDeSalida", item.flet_FechaDeSalida, DbType.Date, ParameterDirection.Input);
            parametros.Add("@flet_UsuCreacion", item.flet_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus EmpezarFlete(tbFletes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", item.flet_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.FletesEmpezar, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        
        public IEnumerable<VW_tbPedidos> PedidosFlete(int item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@flet_Id", item, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbPedidos>(ScriptsDataBase.FletesPedidos, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
