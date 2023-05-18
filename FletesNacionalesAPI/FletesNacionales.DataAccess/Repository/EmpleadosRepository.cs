using Agence.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class EmpleadosRepository : IRepository<VW_tbEmpleados, tbEmpleados>
    {
        public RequestStatus Delete(VW_tbEmpleados item)
        {
            throw new NotImplementedException();
        }

        public tbEmpleados find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(VW_tbEmpleados item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbEmpleados> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(VW_tbEmpleados item)
        {
            throw new NotImplementedException();
        }
    }
}
