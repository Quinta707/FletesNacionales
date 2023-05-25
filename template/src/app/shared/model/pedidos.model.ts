export class Pedidos{
      pedi_Id !: number;
      clie_Id !: number;
      pedi_Peso !: number;
      pedi_Volumen !: number;
      clie_NombreCompleto !: String;
      clie_Identidad !: String;
      clie_FechaNacimiento !: String;
      clie_Sexo !: String;
      eciv_Id !: number;
      clie_DireccionExacta !: String;
      clie_Telefono !: String;
      muni_Origen !: number;
      pedi_OrigenNombre !: String;
      pedi_DepaOrigenId !: number;
      pedi_DepaOrigen !: String;
      muni_Destino !: number;
      pedi_DestinoNombre !: String;
      pedi_DepaDestinoId !: number;
      pedi_DepaDestino !: String;
      pedi_DestinoFinal !: String;
      estp_Id !: number;
      estp_Nombre !: String;
      pedi_UsuCreacion !: number;
      pedi_FechaCreacion !: String;
      pedi_UsuModificacion !: number;
      pedi_FechaModificacion !: String;
      pedi_Estado !: String;
      user_Creacion !: String;
      user_Modificacion !: String;
      pedi_Array: any[] = [];
      Items !: String;

}