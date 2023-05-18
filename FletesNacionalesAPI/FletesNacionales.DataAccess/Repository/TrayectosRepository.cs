using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
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
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbTrayectos item)
        {
            throw new NotImplementedException();
        }
    }
}
