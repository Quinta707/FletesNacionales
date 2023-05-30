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
    public class SucursalesRepository : IRepository<tbSucursales, VW_tbSucursales>
    {
        public RequestStatus Delete(tbSucursales item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.SucursalesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public VW_tbSucursales find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbSucursales>(ScriptsDataBase.SucursalesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbSucursales item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UsuCreacion", item.sucu_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.SucursalesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbSucursales> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbSucursales>(ScriptsDataBase.SucursalesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursales item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UsuCreacion", item.sucu_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.SucursalesUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
    }
}
