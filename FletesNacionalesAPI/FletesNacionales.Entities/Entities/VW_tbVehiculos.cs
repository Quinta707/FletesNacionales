﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbVehiculos
    {
        public int vehi_Id { get; set; }
        public int mode_Id { get; set; }
        public string mode_Nombre { get; set; }
        public decimal vehi_PesoMaximo { get; set; }
        public decimal vehi_VolumenMaximo { get; set; }
        public int tipv_Id { get; set; }
        public string tipv_Descripcion { get; set; }
        public int marc_Id { get; set; }
        public string marc_Nombre { get; set; }
        public string vehi_Placa { get; set; }
        public bool vehi_EnUso { get; set; }
        public string vehi_Usado { get; set; }
        public int vehi_UsuCreacion { get; set; }
        public DateTime? vehi_FechaCreacion { get; set; }
        public int? vehi_UsuModificacion { get; set; }
        public DateTime? vehi_FechaModificacion { get; set; }
        public bool? vehi_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}