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
    public class FletesRepository : IRepository<tbFletes, VW_tbFletes>
    {
        public RequestStatus Delete(tbFletes item)
        {
            throw new NotImplementedException();
        }

        public VW_tbFletes find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbFletes item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbFletes> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbFletes>(ScriptsDataBase.FletesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFletes item)
        {
            throw new NotImplementedException();
        }
    }
}
