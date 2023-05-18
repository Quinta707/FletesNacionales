using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class ClientesRepository : IRepository<VW_tbClientes, tbClientes>
    {
        public RequestStatus Delete(VW_tbClientes item)
        {
            throw new NotImplementedException();
        }

        public tbClientes find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbClientes item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbClientes> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbClientes item)
        {
            throw new NotImplementedException();
        }
    }
}
