﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace FletesNacionales.Entities.Entities
{
    public partial class VW_tbPedidos
    {
        public int pedi_Id { get; set; }
        public int clie_Id { get; set; }
        public string clie_NombreCompleto { get; set; }
        public string clie_Identidad { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public decimal? pedi_Peso { get; set; }
        public decimal? pedi_Volumen { get; set; }
        public string clie_DireccionExacta { get; set; }
        public string clie_Telefono { get; set; }
        public string muni_Origen { get; set; }
        public string pedi_OrigenNombre { get; set; }
        public string pedi_DepaOrigenId { get; set; }
        public string pedi_DepaOrigen { get; set; }
        public string muni_Destino { get; set; }
        public string pedi_DestinoNombre { get; set; }
        public string pedi_DepaDestinoId { get; set; }
        public string pedi_DepaDestino { get; set; }
        public string pedi_DestinoFinal { get; set; }
        public int meto_Id { get; set; }
        public string meto_Descripcion { get; set; }
        public int estp_Id { get; set; }
        public string estp_Nombre { get; set; }
        public int pedi_UsuCreacion { get; set; }
        public DateTime? pedi_FechaCreacion { get; set; }
        public int? pedi_UsuModificacion { get; set; }
        public DateTime? pedi_FechaModificacion { get; set; }
        public bool? pedi_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
    }
}