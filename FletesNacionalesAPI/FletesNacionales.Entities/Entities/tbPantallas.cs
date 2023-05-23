using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class tbPantallas
    {
        public tbPantallas()
        {
            tbPantallasPorRoles = new HashSet<tbPantallasPorRoles>();
        }

        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_Url { get; set; }
        public string pant_Menu { get; set; }
        public string pant_Icono { get; set; }
        public int pant_UsuCreacion { get; set; }
        public DateTime pant_FechaCreacion { get; set; }
        public int? pant_UsuModificacion { get; set; }
        public DateTime? pant_FechaModificacion { get; set; }
        public bool? pant_Estado { get; set; }

        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRoles { get; set; }
    }
}
