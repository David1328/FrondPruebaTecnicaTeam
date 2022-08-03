import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OfertasComponetComponent } from './pages/ofertas-componet/ofertas-componet.component';
import { Oferta } from './_model/Oferta';
import { OfertasService } from './_service/ofertas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pruebaTeamFrond';

  ofertasTabla = new MatTableDataSource<Oferta>();
  displayedColumns: string[] = ['ofertaId', 'nombre', 'descripcion', 'precio', 'editar', 'eliminar'];


  constructor(public dialog: MatDialog, private serviceOferta: OfertasService) { }

  ngOnInit(): void {
    this.serviceOferta.getAll().subscribe(data => {
      console.log(data)
      this.ofertasTabla = new MatTableDataSource(data)
    }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(OfertasComponetComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
