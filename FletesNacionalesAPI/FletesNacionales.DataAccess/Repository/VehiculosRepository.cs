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
    public class VehiculosRepository : IRepository<tbVehiculos, VW_tbVehiculos>
    {
        public RequestStatus Delete(tbVehiculos item)
        {
            throw new NotImplementedException();
        }

        public VW_tbVehiculos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbVehiculos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbVehiculos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbVehiculos>(ScriptsDataBase.ClientesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbVehiculos item)
        {
            throw new NotImplementedException();
        }
    }
}
