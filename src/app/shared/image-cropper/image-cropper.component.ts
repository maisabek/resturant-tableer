import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent {
  @ViewChild("image", { static: false })
  public imageElement: ElementRef | any;
  @Output('saveEvent') saveEvent:EventEmitter<any> = new EventEmitter<any>();
  @Input("src")
  public imageSource: string | any;
  public imageDestination: string;
  private cropper: Cropper | any;

  public constructor(private matDialog:MatDialog) {
      this.imageDestination = "";
  }

  public ngAfterViewInit() {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          crop: () => {
              const canvas = this.cropper.getCroppedCanvas();
              this.imageDestination = canvas.toDataURL("image/png");
           }
      });
  }


  saveHandler(){
    this.saveEvent.emit({image:this.imageDestination});
  }
  closeDialog(){
    this.matDialog.closeAll()
  }
  public ngOnInit() { }
}
