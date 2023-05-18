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
    public class MarcasRepository : IRepository<tbMarcas, VW_tbMarcas>
    {
        public RequestStatus Delete(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public VW_tbMarcas find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbMarcas> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbMarcas>(ScriptsDataBase.MarcasIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMarcas item)
        {
            throw new NotImplementedException();
        }
    }
}
