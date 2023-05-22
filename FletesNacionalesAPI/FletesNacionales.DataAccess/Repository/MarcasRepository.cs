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
    public class MarcasRepository : IRepository<tbMarcas, VW_tbMarcas>
    {
        public RequestStatus Delete(tbMarcas item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.MarcasDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbMarcas find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@marc_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbMarcas>(ScriptsDataBase.MarcasFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbMarcas item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@marc_Nombre", item.marc_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_UsuCreacion", item.marc_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.MarcasInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbMarcas> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbMarcas>(ScriptsDataBase.MarcasIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMarcas item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@marc_Nombre", item.marc_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_UsuModificacion", item.marc_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.MarcasUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
