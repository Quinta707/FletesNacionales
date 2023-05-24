﻿using Agence.DataAccess.Repository;
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
    public class TrayectosRepository : IRepository<tbTrayectos, VW_tbTrayectos>
    {
        public RequestStatus Delete(tbTrayectos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tray_Id", item.tray_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.TrayectosDelete, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbTrayectos find(int? id)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tray_Id", id, DbType.String, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbTrayectos>(ScriptsDataBase.TrayectosFind, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
         public VW_tbTrayectos Exists(int desde, int hasta)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Inicio", desde, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Final", hasta, DbType.Int32, ParameterDirection.Input);
            var result = db.QueryFirst<VW_tbTrayectos>(ScriptsDataBase.TrayectosExiste, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbTrayectos item)
        {
            RequestStatus resultado = new RequestStatus();
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Inicio", item.muni_Inicio, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Final", item.muni_Final, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tray_Precio", item.tray_Precio, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@tray_UsuCreacion", item.tray_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.TrayectosInsert, parametros, commandType: System.Data.CommandType.StoredProcedure);

            resultado.CodeStatus = result;

            return resultado;
        }

        public IEnumerable<VW_tbTrayectos> List()
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            return db.Query<VW_tbTrayectos>(ScriptsDataBase.TrayectosIndex, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTrayectos item)
        {
            using var db = new SqlConnection(FleteContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tray_Id", item.tray_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Inicio", item.muni_Inicio, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Final", item.muni_Final, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tray_UsuModificacion", item.tray_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.TrayectosUpdate, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
