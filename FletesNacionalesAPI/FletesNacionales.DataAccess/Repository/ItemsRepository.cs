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
    public class ItemsRepository : IRepository<tbItems, VW_tbItems>
    {
        public RequestStatus Delete(tbItems item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@item_Id", item.item_Id, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ItemsDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public VW_tbItems find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@item_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbItems>(ScriptsDataBase.ItemsFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbItems item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@item_Nombre", item.item_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@item_Descripcion", item.item_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@item_Peso", item.item_Peso, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@item_Volumen", item.item_Volumen, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@item_UsuCreacion", item.item_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ItemsInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbItems> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbItems>(ScriptsDataBase.ItemsIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbItems item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@item_Id", item.item_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@item_Nombre", item.item_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@item_Descripcion", item.item_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@item_Peso", item.item_Peso, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@item_Volumen", item.item_Volumen, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@item_UsuModificacion", item.item_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.ItemsUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
    }
}
