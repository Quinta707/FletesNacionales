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
    public class TiposDeVehiculosRepository : IRepository<tbTipoDeVehiculo, VW_tbTipoDeVehiculo>
    {
        public RequestStatus Delete(tbTipoDeVehiculo item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tipv_Id", item.tipv_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.TipoDeVehiculoDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbTipoDeVehiculo find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tipv_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbTipoDeVehiculo>(ScriptsDataBase.TipoDeVehiculoFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbTipoDeVehiculo item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tipv_Descripcion", item.tipv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tipv_UsuCreacion", item.tipv_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.TipoDeVehiculoInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbTipoDeVehiculo> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbTipoDeVehiculo>(ScriptsDataBase.TipoDeVehiculoIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTipoDeVehiculo item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tipv_Id", item.tipv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipv_Descripcion", item.tipv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tipv_UsuModificacion", item.tipv_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.TipoDeVehiculoUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
