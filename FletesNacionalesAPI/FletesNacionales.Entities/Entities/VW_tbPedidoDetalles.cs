﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbPedidoDetalles
    {
        public int pdet_Id { get; set; }
        public int item_Id { get; set; }
        public string item_Nombre { get; set; }
        public string item_Descripcion { get; set; }
        public decimal item_Peso { get; set; }
        public decimal item_Volumen { get; set; }
        public int pdet_UsuCreacion { get; set; }
        public DateTime? pdet_FechaCreacion { get; set; }
        public int? pdet_UsuModificacion { get; set; }
        public DateTime? pdet_FechaModificacion { get; set; }
        public bool? pdet_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}