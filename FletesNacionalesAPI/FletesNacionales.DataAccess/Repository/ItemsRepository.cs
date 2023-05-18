using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class ItemsRepository : IRepository<VW_tbItems, tbItems>
    {
        public RequestStatus Delete(VW_tbItems item)
        {
            throw new NotImplementedException();
        }

        public tbItems find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbItems item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbItems> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbItems item)
        {
            throw new NotImplementedException();
        }
    }
}
