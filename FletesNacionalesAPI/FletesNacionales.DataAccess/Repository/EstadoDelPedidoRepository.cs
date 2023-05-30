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
    public class EstadoDelPedidoRepository : IRepository<tbEstadosDelPedido, VW_tbEstadosDelPedido>
    {
        public RequestStatus Delete(tbEstadosDelPedido item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@estp_Id", item.estp_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosDelPedidoDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public VW_tbEstadosDelPedido find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@estp_Id", id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbEstadosDelPedido>(ScriptsDataBase.EstadosDelPedidoFind, parametros, commandType: CommandType.StoredProcedure);

            return resultado;
        }

        public RequestStatus Insert(tbEstadosDelPedido item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@estp_Nombre", item.estp_Nombre, DbType.String, ParameterDirection.Input);
        
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosDelPedidoInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public IEnumerable<VW_tbEstadosDelPedido> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbEstadosDelPedido>(ScriptsDataBase.EstadosDelPedidoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadosDelPedido item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@estp_Id", item.estp_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@estp_Nombre", item.estp_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@estp_UsuModificacion", 1, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EstadosDelPedidoUpdate, parametros, commandType: CommandType.StoredProcedure);


            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }
    }
}
