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
    public class UsuariosRepository : IRepository<tbUsuarios, VW_tbUsuarios>
    {
        public RequestStatus Delete(tbUsuarios item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", item.user_Id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.UsuraiosDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado delete"
            };

            return request;
        }

        public VW_tbUsuarios find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<VW_tbUsuarios>(ScriptsDataBase.UsuraiosFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbUsuarios item)
        {
          
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@usua_NombreUsuario", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Contraseña", item.user_Contrasena, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_EsAdmin", item.user_EsAdmin, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_IdCreacion", item.user_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.UsuraiosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado insert"
            };

            return request;
        }

        public IEnumerable<VW_tbUsuarios> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbUsuarios>(ScriptsDataBase.UsuraiosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", item.user_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_EsAdmin", item.user_EsAdmin, DbType.Byte, ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_Contraseña", item.user_Contrasena, DbType.String, ParameterDirection.Input);         
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_UsuModificacion", item.user_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            result.CodeStatus = db.QueryFirst<int>(ScriptsDataBase.UsuraiosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
        public RequestStatus ValidarUsuariosPoseenRol(int role_Id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarUsuariosPoseenRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Usuarios poseen rol"
            };

            return request;
        }

        public RequestStatus ValidarUserNameExiste(string username)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@user_NombreUsuario", username, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarUsernameExiste, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Usuario"
            };

            return request;
        }

        public IEnumerable<VW_tbEmpleados> EmpleadosNoTienenUsuario()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);

            return db.Query<VW_tbEmpleados>(ScriptsDataBase.EmpleadosNoTienenUsuario, null, commandType: CommandType.StoredProcedure);
        }

        public VW_tbUsuarios Login(tbUsuarios item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_NombreUsuario", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Contrasena", item.user_Contrasena, DbType.String, ParameterDirection.Input);
            return db.QueryFirst<VW_tbUsuarios>(ScriptsDataBase.UsuraiosLogin, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

    }
}
