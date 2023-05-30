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
    public class ClientesRepository : IRepository<tbClientes, VW_tbClientes>
    {
        public RequestStatus Delete(tbClientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ClientesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;

        }

        public VW_tbClientes find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbClientes>(ScriptsDataBase.ClientesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbClientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Nombres", item.clie_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Apellidos", item.clie_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Identidad", item.clie_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_FechaNacimiento", item.clie_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@clie_Sexo", item.clie_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@clie_DireccionExacta", item.clie_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Telefono", item.clie_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_UsuCreacion", item.clie_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.UsuraiosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbClientes> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbClientes>(ScriptsDataBase.ClientesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbClientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@clie_Nombres", item.clie_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Apellidos", item.clie_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Identidad", item.clie_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_FechaNacimiento", item.clie_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@clie_Sexo", item.clie_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@clie_DireccionExacta", item.clie_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Telefono", item.clie_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_UsuModificacion", item.clie_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.UsuraiosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
    }
}
