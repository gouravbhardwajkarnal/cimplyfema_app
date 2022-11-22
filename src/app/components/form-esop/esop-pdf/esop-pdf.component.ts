import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-esop-pdf',
  templateUrl: './esop-pdf.component.html',
  styleUrls: ['./esop-pdf.component.css']
})
export class EsopPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('pdfTable') pdfTable: ElementRef;
   
   downloadAsPDF() {
    debugger;
    const doc = new jsPDF();
    
    const pdfTable = this.pdfTable.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
      
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      
  }

}
