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
    public class MetodosDePagoRepository : IRepository<tbMetodosdePago, VW_tbMetodosdePago>
    {
        public RequestStatus Delete(tbMetodosdePago item)
        {
            throw new NotImplementedException();
        }

        public VW_tbMetodosdePago find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMetodosdePago item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbMetodosdePago> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbMetodosdePago >(ScriptsDataBase.MetodosdePagoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMetodosdePago item)
        {
            throw new NotImplementedException();
        }
    }
}
