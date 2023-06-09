﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FletesNacionales.API.Models
{
    public class FletesViewModel
    {
        public int flet_Id { get; set; }
        public int vehi_Id { get; set; }
        public string vehi_Placa { get; set; }
        public int mode_Id { get; set; }
        public string mode_Nombre { get; set; }
        public int? flet_PedidosTotales { get; set; }
        public int? flet_PedidosCompletados { get; set; }
        public int marc_Id { get; set; }
        public string marc_Nombre { get; set; }
        public int empe_Id { get; set; }
        public int estp_Id { get; set; }
        public string estp_Nombre { get; set; }
        public string empe_NombreCompleto { get; set; }
        public string empe_Identidad { get; set; }
        public DateTime empe_FechaNacimiento { get; set; }
        public string empe_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int muni_Id { get; set; }
        public string empe_DireccionExacta { get; set; }
        public string empe_Telefono { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public int tray_Id { get; set; }
        public int muni_Inicio { get; set; }
        public int muni_Final { get; set; }
        public string muni_NombreInicio { get; set; }
        public string muni_CodigoInicio { get; set; }
        public string muni_NombreFinal { get; set; }
        public string muni_CodigoFinal { get; set; }
        public DateTime flet_FechaDeSalida { get; set; }
        public int flet_UsuCreacion { get; set; }
        public DateTime? flet_FechaCreacion { get; set; }
        public int? flet_UsuModificacion { get; set; }
        public DateTime? flet_FechaModificacion { get; set; }
        public bool? flet_Estado { get; set; }
        public string user_Creacion { get; set; }
        public string user_Modificacion { get; set; }
        public int[] pedidosArray { get; set; }
        public int fdet_Id { get; set; }
        public int tipv_Id { get; set; }
        public string tipv_Descripcion { get; set; }
        public int pedi_Id { get; set; }
        public int muni_Destino { get; set; }
        public int muni_Origen { get; set; }
        public string pedi_OrigenNombre { get; set; }
        public int pedi_DepaOrigenId { get; set; }
        public string pedi_DepaOrigen { get; set; }
        public string pedi_DestinoNombre { get; set; }
        public int pedi_DepaDestinoId { get; set; }
        public string pedi_DepaDestino { get; set; }
        public int fdet_UsuCreacion { get; set; }
        public DateTime? fdet_FechaCreacion { get; set; }
        public int? fdet_UsuModificacion { get; set; }
        public DateTime? fdet_FechaModificacion { get; set; }
        public bool? fdet_Estado { get; set; }
    }
}
