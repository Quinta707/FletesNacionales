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
    public class PedidosRepository : IRepository<tbPedidos, VW_tbPedidos>
    {
        public RequestStatus Delete(tbPedidos item)
        {
            throw new NotImplementedException();
        }

        public VW_tbPedidos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPedidos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbPedidos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbPedidos>(ScriptsDataBase.PedidosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPedidos item)
        {
            throw new NotImplementedException();
        }
    }
}
