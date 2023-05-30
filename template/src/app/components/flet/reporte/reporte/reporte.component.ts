import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Empleados } from '../../../../shared/model/empleados.model';
import { TableService } from '../../../../shared/services/empleados.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  errorMessage: string;

  constructor(public service: TableService) { }

  ngOnInit(): void {
    this.generatePDF();
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const header = [['Id', 'Nombre Completo', 'Sexo', 'Estado Civil']];

    // Obtener los datos de los empleados desde el servicio
    this.service.getEmpleados().subscribe(
      (response: any) => {
        console.log(response); // Verificar la respuesta en la consola

        if (response.success) {
          const data = response.data; // Obtener los datos de los empleados
          const rows = data.map((empleado: Empleados) => [
            empleado.empe_Id,
            empleado.empe_NombreCompleto,
            empleado.empe_Sexo,
            empleado.eciv_Descripcion
          ]);

          // Agregar el título "Listado de Empleados"
          doc.setFontSize(18);
          doc.text('Listado de Empleados', 14, 22);

          // Generar la tabla usando autoTable
          (doc as any).autoTable({
            head: header,
            body: rows,
            didDrawPage: function (data: any) {
              // Código para personalizar el encabezado y pie de página
              const pageCount = doc.getNumberOfPages(); // Obtener el número de páginas
              const currentPage = data.pageNumber;
              const pageWidth = doc.internal.pageSize.width;
              const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              const text = `Documento generado por tu aplicación el ${date}`;
              const textWidth = doc.getTextWidth(text);
              const textX = (pageWidth * 1.3) - textWidth;
              doc.setFontSize(10);
              doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
              doc.text(text, textX, doc.internal.pageSize.height - 10);
            },
            margin: { top: 30, bottom: 20 }
          });

          // Mostrar el PDF en el visor
          const pdfDataUri = doc.output('datauristring');
          this.pdfViewer.nativeElement.src = pdfDataUri;
        } else {
          this.errorMessage = 'No se pudieron obtener los datos de los empleados.';
        }
      },
      (error: any) => {
        this.errorMessage = 'Se produjo un error al obtener los datos de los empleados.';
        console.error(error);
      }
    );
  }
}
