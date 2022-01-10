import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-manager',
  templateUrl: './upload-manager.component.html',
  styleUrls: ['./upload-manager.component.scss']
})
export class UploadManagerComponent implements OnInit {

  isHovering!: boolean;
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i)!);
    }
  }


}
