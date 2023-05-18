using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class VehiculosRepository : IRepository<VW_tbVehiculos, tbVehiculos>
    {
        public RequestStatus Delete(VW_tbVehiculos item)
        {
            throw new NotImplementedException();
        }

        public tbVehiculos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbVehiculos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbVehiculos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbVehiculos item)
        {
            throw new NotImplementedException();
        }
    }
}
