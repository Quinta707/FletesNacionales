using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class PedidosRepository : IRepository<VW_tbPedidos, tbPedidos>
    {
        public RequestStatus Delete(VW_tbPedidos item)
        {
            throw new NotImplementedException();
        }

        public tbPedidos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbPedidos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPedidos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbPedidos item)
        {
            throw new NotImplementedException();
        }
    }
}
