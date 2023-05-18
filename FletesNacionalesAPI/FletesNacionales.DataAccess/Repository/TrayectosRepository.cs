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
    public class TrayectosRepository : IRepository<tbTrayectos, tbTrayectos>
    {
        public RequestStatus Delete(tbTrayectos item)
        {
            throw new NotImplementedException();
        }

        public tbTrayectos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbTrayectos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbTrayectos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<tbTrayectos>(ScriptsDataBase.TrayectosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTrayectos item)
        {
            throw new NotImplementedException();
        }
    }
}
