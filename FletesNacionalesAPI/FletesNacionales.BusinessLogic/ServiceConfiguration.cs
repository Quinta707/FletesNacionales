using Agence.DataAccess;
using Agence.DataAccess.Repository;
using FletesNacionales.BusinessLogic.Services;
using FletesNacionales.DataAccess;
using FletesNacionales.DataAccess.Repository;
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
            service.AddScoped<CargosRepository>();
            service.AddScoped<ClientesRepository>();
            service.AddScoped<DepartamentosRepository>();
            service.AddScoped<EmpleadosRepository>();
            service.AddScoped<EstadoDelPedidoRepository>();
            service.AddScoped<EstadosCivilesRepository>();
            service.AddScoped<FletesRepository>();
            service.AddScoped<ItemsRepository>();
            service.AddScoped<MarcasRepository>();
            service.AddScoped<MetodosDePagoRepository>();
            service.AddScoped<ModelosRepository>();
            service.AddScoped<MunicipiosRepository>();
            service.AddScoped<PedidosRepository>();
            service.AddScoped<RolesRepository>();
            service.AddScoped<SucursalesRepository>();
            service.AddScoped<TiposDeVehiculosRepository>();
            service.AddScoped<TrayectosRepository>();
            service.AddScoped<UsuariosRepository>();
            service.AddScoped<VehiculosRepository>();
            service.AddScoped<PantallasRepository>();
            service.AddScoped<PedidoDetallesRepository>();
            FleteContext.BuildConnectionString(connectionString);
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<AcceService>();
            service.AddScoped<EquiService>();
            service.AddScoped<FletService>();
            service.AddScoped<GralService>();
        }
    }
}
