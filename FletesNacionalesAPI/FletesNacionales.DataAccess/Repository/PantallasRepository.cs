using Agence.DataAccess.Repository;
using Dapper;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.DataAccess.Repository
{
    public class PantallasRepository : IRepository<tbPantallas, tbPantallas>
    {
        public RequestStatus Delete(tbPantallas item)
        {
            throw new NotImplementedException();
        }
        public RequestStatus PantallasPorRolDelete(tbPantallasPorRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.PantallaXRolesDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public tbPantallas find(int? id)
        {
            throw new NotImplementedException();
        }
        public tbPantallas PantallasPorRolfind(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<tbPantallas>(ScriptsDataBase.PantallaXRolesFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbPantallas item)
        {
            throw new NotImplementedException();
        }
        
        public RequestStatus PantallasPorRolInsert(tbPantallasPorRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pant_Id", item.pant_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prol_UsuCreacion", item.prol_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.PantallaXRolesInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<tbPantallas> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<tbPantallas>(ScriptsDataBase.PantallasIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPantallas item)
        {
            throw new NotImplementedException();
        }
    }
}
