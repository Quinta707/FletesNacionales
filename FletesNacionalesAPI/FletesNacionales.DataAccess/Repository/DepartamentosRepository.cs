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
    public class DepartamentosRepository : IRepository<tbDepartamentos, VW_tbDepartamentos>
    {
        public RequestStatus Delete(tbDepartamentos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.DepartamentosDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public VW_tbDepartamentos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@depa_Id", id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbDepartamentos>(ScriptsDataBase.DepartamentosFind, parametros, commandType: CommandType.StoredProcedure);

            return resultado;
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuCreacion", item.depa_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.DepartamentosInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }

        public IEnumerable<VW_tbDepartamentos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbDepartamentos>(ScriptsDataBase.DepartamentosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuModificacion", item.depa_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.DepartamentosUpdate, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado
            };

            return request;
        }
    }
}
