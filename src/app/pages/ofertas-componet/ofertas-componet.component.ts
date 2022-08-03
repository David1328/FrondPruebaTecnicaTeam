import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Oferta } from 'src/app/_model/Oferta';
import { OfertasService } from 'src/app/_service/ofertas.service';
@Component({
  selector: 'app-ofertas-componet',
  templateUrl: './ofertas-componet.component.html',
  styleUrls: ['./ofertas-componet.component.css']
})
export class OfertasComponetComponent implements OnInit {

  //Creacion del formGroup para el formulario de nueva oferta
  form_actualizarOferta = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price_value: new FormControl("", [Validators.required, Validators.min(100), Validators.max(500000000)])
  });

  /*Contructor con el matdialog, ademas de los servicios y el MAT_DIALOG_DATA para comunicar el app componet
  con la oferta ya que es un dialog
  */
  constructor(
    public dialogRef: MatDialogRef<OfertasComponetComponent>,
    private serviceOferta: OfertasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id_oferta: any) { }

    //Metodo que se inicia cuando incia el componente oferta
  ngOnInit(): void {
    //Se llama el servicio para llenar el fomulario según el ID
    this.serviceOferta.obtenerOfetaPorId(this.id_oferta).subscribe(data => {
      this.form_actualizarOferta = new FormGroup({
        name: new FormControl(data.name, [Validators.required]),
        description: new FormControl(data.description, [Validators.required]),
        price_value: new FormControl(data.price_value, [Validators.required, Validators.min(100), Validators.max(500000000)])
      });
    })
  }

  //Metodo que consume el servicios de actualizar oferta
  actualizarOferta() {
    let ofertaActualizada: Oferta = new Oferta();
    ofertaActualizada = this.form_actualizarOferta.value;
    ofertaActualizada.offerse_id = this.id_oferta;
    this.serviceOferta.editarOferta(ofertaActualizada).subscribe(data => {
      if(data){
        this.openSnackBar("Se acualizo "+ofertaActualizada.name+" satisfactoriamente")
      }
    })
  }
  //metodo par acerrar el dialog
  onNoClick(): void {
    this.dialogRef.close();
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
