﻿using Agence.BusinessLogic;
using FletesNacionales.DataAccess.Repository;
using FletesNacionales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FletesNacionales.BusinessLogic.Services
{
    public class AcceService
    {
        private readonly UsuariosRepository _usuariosRepository;
        private readonly RolesRepository _rolesRepository;
        private readonly PantallasRepository _pantallasRepository;

        public AcceService(    UsuariosRepository usuariosRepository,
                               RolesRepository rolesRepository,
                               PantallasRepository pantallasRepository)
        {
            _usuariosRepository = usuariosRepository;
            _rolesRepository = rolesRepository;
            _pantallasRepository = pantallasRepository;
        }


        #region Roles
        public ServiceResult ListadoRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage(list.CodeStatus.ToString(), ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
            }
            catch (Exception x)
            {

                return result.Error(x.Message);
            }
        }
        public ServiceResult ActualizarRoles(tbRoles item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _rolesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);

            }
        }


        public ServiceResult EliminarRoles(tbRoles item)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _rolesRepository.Delete(item);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == -3)
                    return result.SetMessage("EnUso", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public VW_tbRoles BuscarRoles(int? id)
        {
            try
            {
                var list = _rolesRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        #region Pnatallas por Rol
        public ServiceResult InsertarPantallasPorRoles(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasRepository.PantallasPorRolInsert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
            }
            catch (Exception x)
            {

                return result.Error(x.Message);
            }
        }

        public ServiceResult EliminarPantallasPorRoles(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _pantallasRepository.PantallasPorRolDelete(item);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("RegistroEliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Usuarios

        public ServiceResult ListadoUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuariosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuariosRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
            }
            catch (Exception x)
            {

                return result.Error(x.Message);
            }
        }
        public ServiceResult EditarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuariosRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                }
            }
            catch (Exception x)
            {

                return result.Error(x.Message);
            }
        }
        public ServiceResult EliminarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();

            try
            {
                var insert = _usuariosRepository.Delete(item);

                if (insert.CodeStatus == 1)
                    return result.SetMessage("Eliminado", ServiceResultType.Success);
                else if (insert.CodeStatus == -3)
                    return result.SetMessage("EnUso", ServiceResultType.Success);
                else if (insert.CodeStatus == 0)
                    return result.SetMessage("ErrorInesperado", ServiceResultType.Error);
                else
                    return result.SetMessage("Conexión perdida", ServiceResultType.Error);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public VW_tbUsuarios BuscarUsuario(int? id)
        {
            try
            {
                var list = _usuariosRepository.find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        public VW_tbUsuarios LoginUsuario(tbUsuarios item)
        {
            try
            {
                var list = _usuariosRepository.Login(item);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion


    }
}
