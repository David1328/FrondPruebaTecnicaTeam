import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-ofertas-componet',
  templateUrl: './ofertas-componet.component.html',
  styleUrls: ['./ofertas-componet.component.css']
})
export class OfertasComponetComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OfertasComponetComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string) { }


    form_recuperar = new FormGroup({
      correo: new FormControl("",[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern(
          /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/
        ),
      ]),
    });
  ngOnInit(): void {
  }

  onNoClick():void{
    this.dialogRef.close();
  }
}
