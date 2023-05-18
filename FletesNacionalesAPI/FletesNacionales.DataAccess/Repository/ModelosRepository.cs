using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class ModelosRepository : IRepository<VW_tbModelos, tbModelos>
    {
        public RequestStatus Delete(VW_tbModelos item)
        {
            throw new NotImplementedException();
        }

        public tbModelos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbModelos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbModelos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbModelos item)
        {
            throw new NotImplementedException();
        }
    }
}
