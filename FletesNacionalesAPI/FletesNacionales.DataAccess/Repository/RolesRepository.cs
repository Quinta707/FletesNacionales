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
    public class RolesRepository : IRepository<tbRoles, tbRoles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public tbRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbRoles> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<tbRoles>(ScriptsDataBase.RolesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRoles item)
        {
            throw new NotImplementedException();
        }
    }
}
