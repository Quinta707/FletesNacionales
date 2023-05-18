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
    public class ItemsRepository : IRepository<tbItems, VW_tbItems>
    {
        public RequestStatus Delete(tbItems item)
        {
            throw new NotImplementedException();
        }

        public VW_tbItems find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbItems item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbItems> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbItems>(ScriptsDataBase.ItemsIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbItems item)
        {
            throw new NotImplementedException();
        }
    }
}
