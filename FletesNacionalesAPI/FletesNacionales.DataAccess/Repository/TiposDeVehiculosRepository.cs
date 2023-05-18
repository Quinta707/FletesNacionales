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
    public class TiposDeVehiculosRepository : IRepository<tbTipoDeVehiculo, VW_tbTipoDeVehiculo>
    {
        public RequestStatus Delete(tbTipoDeVehiculo item)
        {
            throw new NotImplementedException();
        }

        public VW_tbTipoDeVehiculo find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbTipoDeVehiculo item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbTipoDeVehiculo> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbTipoDeVehiculo>(ScriptsDataBase.TipoDeVehiculoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTipoDeVehiculo item)
        {
            throw new NotImplementedException();
        }
    }
}
