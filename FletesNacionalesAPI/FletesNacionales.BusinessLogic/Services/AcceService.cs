using FletesNacionales.DataAccess.Repository;
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

        public AcceService(    UsuariosRepository usuariosRepository,
                               RolesRepository rolesRepository)
        {
            _usuariosRepository = usuariosRepository;
            _rolesRepository = rolesRepository;
        }


    }
}
