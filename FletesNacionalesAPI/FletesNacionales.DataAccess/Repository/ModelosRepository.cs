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
    public class ModelosRepository : IRepository<tbModelos, VW_tbModelos>
    {
        public RequestStatus Delete(tbModelos item)
        {
            throw new NotImplementedException();
        }

        public VW_tbModelos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbModelos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbModelos> List()
        { 
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbModelos>(ScriptsDataBase.ModelosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbModelos item)
        {
            throw new NotImplementedException();
        }
    }
}
