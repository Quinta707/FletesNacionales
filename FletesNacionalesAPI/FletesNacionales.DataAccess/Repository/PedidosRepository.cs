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
    public class PedidosRepository : IRepository<tbPedidos, VW_tbPedidos>
    {
        public RequestStatus Delete(tbPedidos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidosDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbPedidos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbPedidos>(ScriptsDataBase.PedidosFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbPedidos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Origen", item.muni_Origen, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Destino", item.muni_Destino, DbType.String, ParameterDirection.Input);
            parametros.Add("@pedi_DestinoFinal", item.pedi_DestinoFinal, DbType.String, ParameterDirection.Input);
            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pedi_UsuCreacion", item.pedi_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbPedidos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbPedidos>(ScriptsDataBase.PedidosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbPedidos> ListarPedidos(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbPedidos>(ScriptsDataBase.ListarPedidos, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbPedidos> PedidosPorMunicipio(int id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbPedidos>(ScriptsDataBase.PedidosPorMunicipio, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPedidos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Origen", item.muni_Origen, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Destino", item.muni_Destino, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pedi_DestinoFinal", item.pedi_DestinoFinal, DbType.String, ParameterDirection.Input);
            parametros.Add("@pedi_UsuModificacion", item.pedi_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.PedidosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
        public RequestStatus UpdateEstado(tbPedidos item)
        {
            RequestStatus resultado = new RequestStatus();
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pedi_Id", item.pedi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@estp_Id", item.estp_Id, DbType.Int32, ParameterDirection.Input);

            resultado.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.PedidosUpdateEstado, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return resultado;
        }
    }
}
