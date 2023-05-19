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
    public class VehiculosRepository : IRepository<tbVehiculos, VW_tbVehiculos>
    {
        public RequestStatus Delete(tbVehiculos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_Id", item.vehi_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.VehiculosDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbVehiculos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbVehiculos>(ScriptsDataBase.VehiculosFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbVehiculos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@mode_Id", item.mode_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_PesoMaximo", item.vehi_PesoMaximo, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_VolumenMaximo", item.vehi_VolumenMaximo, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_Placa", item.vehi_Placa, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_UsuCreacion", item.vehi_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.VehiculosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbVehiculos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbVehiculos>(ScriptsDataBase.VehiculosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbVehiculos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_Id", item.vehi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_Id", item.mode_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_PesoMaximo", item.vehi_PesoMaximo, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_VolumenMaximo", item.vehi_VolumenMaximo, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_Placa", item.vehi_Placa, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_UsuModificacion", item.vehi_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.VehiculosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
