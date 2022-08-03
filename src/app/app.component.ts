//Librerias para usar 
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarOfertaComponent } from './pages/agregar-oferta/agregar-oferta.component';
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

  //Variable matable para la interfaz
  ofertaTabla = new MatTableDataSource<Oferta>();
  //Nombre de las columnas
  displayedColumns: string[] = ['ofertaId', 'nombre', 'descripcion', 'precio', 'editar', 'eliminar'];

  //Contructor donde se inyecta el matDialog ademas del service
  constructor(public dialog: MatDialog, private serviceOferta: OfertasService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Se llama el servicio obtener todas las ofertas
    this.serviceOferta.obternerOfertas().subscribe(data => {
      data.sort((a,b)=> (a.offerse_id > b.offerse_id)?1:-1)
      this.ofertaTabla = new MatTableDataSource(data)
    }
    )
  }

  //Metodo para abrir la interfaz de editar oferta
  editDialog(id_oferta:number): void {
    const dialogRef = this.dialog.open(OfertasComponetComponent, {data:id_oferta});

    dialogRef.afterClosed().subscribe(result => {
      this.serviceOferta.obternerOfertas().subscribe(data => {
        //Metodo para organizar el array
        data.sort((a,b)=> (a.offerse_id > b.offerse_id)?1:-1)
        this.ofertaTabla = new MatTableDataSource(data)
      })
    });
  }

  //Metodo que consume el servicio de elminar oferta según el ID
  eliminarOferta(id_oferta: any) {
    this.serviceOferta.eliminarOFerta(id_oferta).subscribe(data => {
      if(data){
        this.openSnackBar("Se elimino satisfactoriamente")
      }else{
        this.openSnackBar("Algo salio mal")
      }
      this.ngOnInit();
    })
  }

  //Metodo para abrir la interfaz de agregar nueva oferta
  nuevaOferta() {
    const dialogRef = this.dialog.open(AgregarOfertaComponent, {});

    //para cuando se cierre el dialog
    dialogRef.afterClosed().subscribe(result => {
      this.serviceOferta.obternerOfertas().subscribe(data => {
        //Metodo de ordenamieto
        data.sort((a,b)=> (a.offerse_id > b.offerse_id)?1:-1)
        this.ofertaTabla = new MatTableDataSource(data)
      })
    });
  }

  //Metodo para abrir un snackBar con un mensaje
  private openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Aceptar', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
