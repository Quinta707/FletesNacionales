import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Empleados } from '../../../../shared/model/empleados.model';
import { TableService } from '../../../../shared/services/empleados.service';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { ServiceService } from '../../../../shared/services/pedidos.service';
import { Items } from '../../../../shared/model/items.model';
import { ItemsService } from '../../../../shared/services/items.service';
import { Clientes } from '../../../../shared/model/clientes.model';
import { ClientService } from '../../../../shared/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  errorMessage: string;


  constructor(public service: TableService,
    public service2: ServiceService,
    public service3: ItemsService,
    public service4: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {



    this.generatePDF();
  }
  id = this.route.snapshot.queryParams["id"];

  generatePDF(): void {
    const doc = new jsPDF();
    const header = [['Id', 'Item Nombre', 'Item Descripcion', 'Peso', 'Volumen', 'Cantidad']];


    // Obtener los datos de los empleados desde el servicio
    this.service2.getPedidosListado(this.id).subscribe(
      (response: any) => {

        const data = response; // Obtener los datos de los empleados
        const rows = data.map((Pedido: any) => [
          Pedido.item_Id,
          Pedido.item_Nombre,
          Pedido.item_Descripcion,
          Pedido.item_Peso,
          Pedido.item_Volumen,
          Pedido.pdet_Cantidad
        ]);
        console.log("data", data)
        let pesoTotal: number = 0
        let volumenTotal: number = 0
        data.forEach(element => {
          pesoTotal += element.item_Peso * element.pdet_Cantidad
          volumenTotal += element.item_Volumen  * element.pdet_Cantidad
        });

        console.log(pesoTotal,volumenTotal)

        const precioPorKG : number = 1.5

        const existingRows = [
          [null,null,null,null,null, null],
          [null,null,null,null,'Tipo', "Total"],
          [null,null,null,null,'Precio por kg:', precioPorKG],
          [null,null,null,null,'Precio del trayecto:', data[0].tray_Precio],
          [null,null,null,null,'SubTotal:', pesoTotal* precioPorKG + data[0].tray_Precio],
          [null,null,null,null,'IVA:', (pesoTotal * precioPorKG + data[0].tray_Precio)* 0.10],
          [null,null,null,null,'Total:', (pesoTotal* precioPorKG + data[0].tray_Precio ) * ((pesoTotal * precioPorKG + data[0].tray_Precio)* 0.10)],
        ];
        
        rows.push(...existingRows);
        
        console.log(rows);
        doc.setFontSize(18);

        const footerHeight = 65;
        const imageUrl = 'https://i.ibb.co/jzbQb6B/14064375-5439134.jpg';
        const imageWidth = doc.internal.pageSize.getWidth();
        const imageHeight = footerHeight;


        const encabezado = function (doc: any) {
          // doc.addImage(imageUrl, 'JPEG', 0, doc.internal.pageSize.getHeight() - footerHeight, imageWidth, imageHeight);
          doc.text(`Pedido de ${data[0].clie_NombreCompleto}`, 15, 15);
          doc.setFontSize(12);
          // doc.text(`Origen: ${data[0].pedi_OrigenNombre}, ${data[0].pedi_DepaOrigen}`, 15, 25);
          // doc.text(`Destino: ${data[0].pedi_DestinoNombre}, ${data[0].pedi_DepaDestino}`, 50, 25);
          // doc.text(`Direccion Exacta: ${data[0].pedi_DestinoFinal}`, 15, 35);
          const textWidth = 180;
          const columnWidth = (doc.internal.pageSize.getWidth() - 0.1) / 2;
          doc.setFontSize(12);
          doc.text(`Origen: ${data[0].pedi_OrigenNombre}, ${data[0].pedi_DepaOrigen}`, 15, 25, { maxWidth: columnWidth - 20 });
          doc.setFontSize(12);
          doc.text(`Destino: ${data[0].pedi_DestinoNombre}, ${data[0].pedi_DepaDestino}`, columnWidth + 0, 25, { maxWidth: columnWidth - 20 });

          const longText = `Direccion Exacta: ${data[0].pedi_DestinoFinal}`;
          const lines = doc.splitTextToSize(longText, textWidth);

          doc.text(lines, 15, 35);
        };
        encabezado(doc);

        doc.text(`Items`, 15, 53);
        (doc as any).autoTable({
          head: header,
          body: rows,

          didDrawPage: function (data: any) {
            const pageCount = doc.getNumberOfPages();
            const currentPage = data.pageNumber;
            const pageWidth = doc.internal.pageSize.width;
            const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const text = `Documento generado por tu aplicación el ${date}`;
            const textWidth = doc.getTextWidth(text);
            const textX = (pageWidth * 1) - textWidth;
            doc.setFontSize(10);
            doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
            doc.text(text, textX, doc.internal.pageSize.height - 10);
          },
          margin: { top: 55, bottom: 20 }
        });

        const pdfDataUri = doc.output('datauristring');
        this.pdfViewer.nativeElement.src = pdfDataUri;

      },
      (error: any) => {
        this.errorMessage = 'Se produjo un error al obtener los datos de los empleados.';
        console.error(error);
      }
    );
  }
Regresar(){
  this.router.navigate(['/flet/Pedidos/List']);
}

}
