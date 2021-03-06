import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ELEMENTDATAService } from 'src/app/shared/element-data.service'
import { PeriodicElement } from '../app.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  @ViewChild(MatTable)
  table!:MatTable<any>;
  displayedColumns: string[] = ['adicionar', 'quantidade', 'editar', 'delete'];





  constructor(public dialog: MatDialog, public service:ELEMENTDATAService ) { }




  openDialog(element:PeriodicElement | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: element === null ? {
        adicionar:null,
        quantidade:'',
        editar:null,
        delete:''
      }:element
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result !== undefined){
       this.service.ELEMENT_DATA.push(result);
       //editar
       //this.dataSource[indice] = result;
       this.table.renderRows();
     }
    });

  }
  openDialogEdit(element:PeriodicElement | null, index: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: element === null ? {
        adicionar:null,
        quantidade:'',
        editar:null,
        delete:''
      }:element
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result !== undefined){
        this.service.ELEMENT_DATA.splice(index,1, result); 
        this.table.renderRows();
     }
    });
  }
  removeData(index:number) {
    this.service.ELEMENT_DATA.splice(index,1);
    this.table.renderRows();
  }

  ngOnInit(): void {
  }

}