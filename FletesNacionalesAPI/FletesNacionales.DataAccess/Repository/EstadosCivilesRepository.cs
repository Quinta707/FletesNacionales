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
    public class EstadosCivilesRepository : IRepository<tbEstadosCiviles, VW_tbEstadosCiviles>
    {
        public RequestStatus Delete(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@eciv_Id", item.eciv_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosCivileseDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public VW_tbEstadosCiviles find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@eciv_Id", id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbEstadosCiviles>(ScriptsDataBase.EstadosDelPedidoFind, parametros, commandType: CommandType.StoredProcedure);

            return resultado;
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@eciv_Descripcion", item.eciv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_UsuCreacion", 1, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosCivileseInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };


            return request;
        }

        public IEnumerable<VW_tbEstadosCiviles> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbEstadosCiviles>(ScriptsDataBase.EstadosCivileseIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@eciv_Id", item.eciv_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Descripcion", item.eciv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_UsuModificacion", 1, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosCivileseUpdate, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };


            return request;
        }
    }
}
