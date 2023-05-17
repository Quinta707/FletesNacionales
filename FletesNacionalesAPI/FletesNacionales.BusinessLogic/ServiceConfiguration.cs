using Agence.DataAccess;
using Agence.DataAccess.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agence.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string connectionString)
        {
            //service.AddScoped<UsuarioRepository>();
            //AgenceContext.BuildConnectionString(connectionString);
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
            //service.AddScoped<AcceService>();
        }
    }
}
