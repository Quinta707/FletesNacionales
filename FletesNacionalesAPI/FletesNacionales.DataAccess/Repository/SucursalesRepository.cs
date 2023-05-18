﻿using Agence.DataAccess.Repository;
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
    public class SucursalesRepository : IRepository<tbSucursales, tbSucursales>
    {
        public RequestStatus Delete(tbSucursales item)
        {
            throw new NotImplementedException();
        }

        public tbSucursales find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbSucursales item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbSucursales> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<tbSucursales>(ScriptsDataBase.SucursalesIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursales item)
        {
            throw new NotImplementedException();
        }
    }
}
