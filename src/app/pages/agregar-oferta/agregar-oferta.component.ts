import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfertasService } from 'src/app/_service/ofertas.service';

@Component({
  selector: 'app-agregar-oferta',
  templateUrl: './agregar-oferta.component.html',
  styleUrls: ['./agregar-oferta.component.css']
})
export class AgregarOfertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AgregarOfertaComponent>,
    private ofertaService: OfertasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public message: string) { }


  form_nuevaOferta = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price_value: new FormControl("", [Validators.required, Validators.min(100), Validators.max(500000000)])
  });

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarNuevaOferta() {
    console.log(this.form_nuevaOferta.value)
    this.ofertaService.agregarOferta(this.form_nuevaOferta.value).subscribe(data => {
      this.openSnackBar("Se agrego la oferta con exito")
    })
  }
  private openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Aceptar', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
