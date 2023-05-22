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
    public class PedidoDetallesRepository : IRepository<tbPedidoDetalles, VW_tbPedidoDetalles>
    {
        public RequestStatus Delete(tbPedidoDetalles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pdet_Id", item.pdet_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidoDetallesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbPedidoDetalles find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pdet_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbPedidoDetalles>(ScriptsDataBase.PedidoDetallesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbPedidoDetalles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@item_Id", item.item_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pdet_UsuCreacion", item.pdet_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidoDetallesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbPedidoDetalles> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbPedidoDetalles>(ScriptsDataBase.PedidoDetallesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPedidoDetalles item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pdet_Id", item.pdet_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@item_Id", item.item_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pdet_UsuCreacion", item.pdet_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidoDetallesUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
