import { PublicService } from './../../../services/generic/public.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';


@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, ImageModule],
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imagePath: string = '';

  @Input() image: any = '';
  @Input() showImage: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() enableReplace: boolean = false;
  @Input() name: any = '';

  @Output() uploadHandler: EventEmitter<any> = new EventEmitter();
  @Output() removeHandler: EventEmitter<any> = new EventEmitter();

  imageLoaded: boolean = false;
  isLoading: boolean = false;
  dragging: boolean = false;
  loaded: boolean = false;
  imageName: string = '';
  imageSize: any;

  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
  ) { }

  ngOnInit(): void {
    this.imageName = this.image ? this.imagePath + this.image : '';
    this.publicService?.removeUploadImg?.subscribe((res: any) => {
      if (res == true) {
        this.removeImg();
      }
    });

  }

  uploadHandlerEmit(image: any): void {
    this.uploadHandler?.emit({ image: image, imageName: this.imageName });
  }

  handleInputChange(e: any): void {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;

    let formData = new FormData();
    formData.append('files', file);
    // this.formatSizeUnits(file?.size);
    if (file?.size < 5000000) {
      this.isLoading = true;
      // this.uploadHandlerEmit(file);
      this.formatSizeUnits(file?.size);
      this.name = file?.name;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      // this.loaded = false;
      this.showImage = true;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    } else {
      this.alertsService?.openToast('error', 'error', 'File size must be less than 4 MB');
      // this.imageName = '';
      // this.showImage = false;
      // this.uploadHandlerEmit(null);
      // this.name = null;
      // this.image = null;
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleDragEnter(): void {
    this.dragging = true;
    // this.showImage = true;
  }

  handleDragLeave(): void {
    this.dragging = false;
    // this.showImage = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    this.handleInputChange(event);
    // this.showImage = true;
  }

  handleImageLoad(): void {
    this.imageLoaded = true;
    this.showImage = true;
  }

  _handleReaderLoaded(e: any): void {
    this.isEdit = false;
    var reader = e.target;
    let img = this.base64ToImageFile(reader.result, "image");
    this.imageName = reader.result;
    this.uploadHandlerEmit(img);


    this.isLoading = false;
    // if (img?.size > 400000) {
    // this.loaded = true;
    //   alert('file size must be more than 2000');
    //   this.showImage = false
    //   this.imageName = '';
    // } else {
    this.showImage = true;
    // }
  }

  removeImg(): void {
    this.imageName = '';
    this.showImage = false;
    this.uploadHandlerEmit(null);
    this.name = null;
    this.image = null;
  }

  formatSizeUnits(size: any): void {
    if (size >= 1073741824) { size = (size / 1073741824).toFixed(2) + " GB"; }
    else if (size >= 1048576) { size = (size / 1048576).toFixed(2) + " MB"; }
    else if (size >= 1024) { size = (size / 1024).toFixed(2) + " KB"; }
    else if (size > 1) { size = size + " bytes"; }
    else if (size == 1) { size = size + " byte"; }
    else { size = "0 bytes"; }
    this.imageSize = size;
  }

  base64ToImageFile(data: any, filename: any) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename + "." + mime.substr(6), { type: mime });
  }
}

