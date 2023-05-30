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
    public class RolesRepository : IRepository<tbRoles, VW_tbRoles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            RequestStatus result = new RequestStatus();
         
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.RolesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public VW_tbRoles find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbRoles>(ScriptsDataBase.RolesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuCreacion", 1, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.RolesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbRoles> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbRoles>(ScriptsDataBase.RolesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuModificacion", item.role_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.RolesUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbPantallasPorRoles> ListRolesporPantalla()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbPantallasPorRoles>(ScriptsDataBase.PantallaXRolesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus InsertRolPorPantalla(VW_tbPantallasPorRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pant_Id", item.pant_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prol_UsuCreacion", 1, DbType.Int32, ParameterDirection.Input);

             result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.PantallaXRolesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        public RequestStatus DeleteRolPorPantalla(VW_tbPantallasPorRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);

            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.PantallaXRolesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbPantallasPorRoles> Menu(int id, bool esadmin)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@role_ID", id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@esAdmin", esadmin, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbPantallasPorRoles>(ScriptsDataBase.PantallasXRolesMenu, parameters, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbPantallasPorRoles> FindRolPorPantalla(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbPantallasPorRoles>(ScriptsDataBase.PantallaXRolesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }


    }
}
