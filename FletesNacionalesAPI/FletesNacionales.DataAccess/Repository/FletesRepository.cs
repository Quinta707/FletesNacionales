using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class FletesRepository : IRepository<VW_tbFletes, tbFletes>
    {
        public RequestStatus Delete(VW_tbFletes item)
        {
            throw new NotImplementedException();
        }

        public tbFletes find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbFletes item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbFletes> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbFletes item)
        {
            throw new NotImplementedException();
        }
    }
}
