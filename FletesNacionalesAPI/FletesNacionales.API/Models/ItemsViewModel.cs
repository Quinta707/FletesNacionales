using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class ItemsViewModel
    {
        public int item_Id { get; set; }
        public string item_Nombre { get; set; }
        public string item_Descripcion { get; set; }
        public decimal item_Peso { get; set; }
        public decimal item_Volumen { get; set; }
        public bool item_Habilitado { get; set; }
        public string item_Visible { get; set; }
        public int item_UsuCreacion { get; set; }
        public DateTime? item_FechaCreacion { get; set; }
        public int? item_UsuModificacion { get; set; }
        public DateTime? item_FechaModificacion { get; set; }
        public bool? item_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}
