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
    public class MetodosDePagoRepository : IRepository<tbMetodosdePago, VW_tbMetodosdePago>
    {
        public RequestStatus Delete(tbMetodosdePago item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@meto_Id", item.meto_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.MetodosdePagoDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public VW_tbMetodosdePago find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@meto_Id", id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbMetodosdePago>(ScriptsDataBase.MetodosdePagoFind, parametros, commandType: CommandType.StoredProcedure);


            return resultado;
        }

        public RequestStatus Insert(tbMetodosdePago item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@meto_Descripcion", item.meto_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@meto_UsuCreacion", item.meto_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.MetodosdePagoInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public IEnumerable<VW_tbMetodosdePago> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbMetodosdePago >(ScriptsDataBase.MetodosdePagoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMetodosdePago item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Descripcion", item.meto_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@meto_UsuModificacion", item.meto_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.MetodosdePagoUpdate, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }
    }
}
