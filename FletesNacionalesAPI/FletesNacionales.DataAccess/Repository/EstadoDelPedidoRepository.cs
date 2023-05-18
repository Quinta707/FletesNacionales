using Agence.DataAccess.Repository;
using Dapper;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
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
            throw new NotImplementedException();
        }

        public VW_tbEstadosDelPedido find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadosDelPedido item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbEstadosDelPedido> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbEstadosDelPedido>(ScriptsDataBase.EstadosDelPedidoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadosDelPedido item)
        {
            throw new NotImplementedException();
        }
    }
}
