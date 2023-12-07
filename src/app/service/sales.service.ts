import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }

  async report(ventas: any[]){

  function buildTableBody(data:any,columns:any){
    const body = [];
    data.forEach(function(row:any){
      const dataRow:any[] = [];
      columns.forEach(function(column:any){
        const obj={
          text: row['column'],
          style: 'Subheader'
        };

      dataRow.push(obj);
      });
      body.push(dataRow);
    });
    const obj2= [{
      fontSize:16,
      bold:true,
      text: 'Prueba',
      style: 'subheader'
    },
    {
      fontSize:16,
      bold:true,
      text: 'Total',
      style: 'subheader'
    }];
    body.push(obj2);
    return body;
  }
}

generatePDF(listaProducts: any) {
  // Definir el contenido del PDF
  const documentDefinition = {
    content: [
      {
        text: 'Reporte de venta', style: 'header'
      },
      '\n\n',
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: [
            ['Nombre del producto', 'Precio', 'Total'],
            ...listaProducts.map( (p: any) => [ p.product.name, p.product.price, p.total])
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      }
    }
  };

  // Crear el PDF
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  // Descargar el PDF
  pdfDocGenerator.download('Reportede_productos.pdf');
}

}
