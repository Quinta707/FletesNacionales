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
    public class ModelosRepository : IRepository<tbModelos, VW_tbModelos>
    {
        public RequestStatus Delete(tbModelos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@mode_Id", item.mode_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ModelosDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbModelos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@mode_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbModelos>(ScriptsDataBase.ModelosFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbModelos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@mode_Nombre", item.mode_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipv_Id", item.tipv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_UsuCreacion", item.mode_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ModelosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbModelos> List()
        { 
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbModelos>(ScriptsDataBase.ModelosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbModelos item)
        {
            RequestStatus result = new RequestStatus();
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@mode_Id", item.mode_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_Nombre", item.mode_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipv_Id", item.tipv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_UsuModificacion", item.mode_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ModelosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
