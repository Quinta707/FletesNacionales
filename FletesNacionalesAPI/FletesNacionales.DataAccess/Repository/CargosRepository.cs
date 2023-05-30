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
    public class CargosRepository : IRepository<tbCargos, VW_tbCargos>
    {
        public RequestStatus Delete(tbCargos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.CargosDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public VW_tbCargos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@carg_Id", id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbCargos>(ScriptsDataBase.CargosFind, parametros, commandType: CommandType.StoredProcedure);

            return resultado;
        }

        public RequestStatus Insert(tbCargos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.CargosInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public IEnumerable<VW_tbCargos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbCargos>(ScriptsDataBase.CargosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCargos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuModificacion", 1, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.CargosUpdate, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }
    }
}
