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
    public class EmpleadosRepository : IRepository<tbEmpleados, VW_tbEmpleados>
    {
        public RequestStatus Delete(tbEmpleados item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@empe_Id", item.empe_Id, DbType.Int16, ParameterDirection.Input);

            var resultado = db.QueryFirst<string>(ScriptsDataBase.EmpleadosDelete, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                MessageStatus = resultado
            };
                
            return request;
        }

        public VW_tbEmpleados find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@empe_Id", id, DbType.Int16, ParameterDirection.Input);

            var resultado = db.QueryFirst<VW_tbEmpleados>(ScriptsDataBase.EmpleadosFind, parametros, commandType: CommandType.StoredProcedure);

         
            return resultado;
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@empe_Nombres", item.empe_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Apellidos", item.empe_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Identidad", item.empe_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_FechaNacimiento", item.empe_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@empe_Sexo", item.empe_Sexo, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_DireccionExacta", item.empe_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Telefono", item.empe_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_UsuModificacion", 1, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<string>(ScriptsDataBase.EmpleadosInsert, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                MessageStatus = resultado
            };

            return request;
        }

        public IEnumerable<VW_tbEmpleados> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbEmpleados>(ScriptsDataBase.EmpleadosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEmpleados item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@empe_Id", item.empe_Id, DbType.Int16, ParameterDirection.Input);
            parametros.Add("@empe_Nombres", item.empe_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Apellidos", item.empe_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Identidad", item.empe_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_FechaNacimiento", item.empe_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@empe_Sexo", item.empe_Sexo, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_DireccionExacta", item.empe_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Telefono", item.empe_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_UsuModificacion", 1, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<string>(ScriptsDataBase.EmpleadosUpdate, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                MessageStatus = resultado
            };

            return request;
        }
    }
}
