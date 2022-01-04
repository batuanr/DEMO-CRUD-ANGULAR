import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  file: File;
  ref: AngularFireStorageReference;
  url: string;
  checkUpload: boolean;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(
    private angularfireStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }
  onFileChanged($event){
    this.file  = $event.target.files[0];
    // console.log(this.file);
    this.onUpload();
  }
  onUpload(){
    this.checkUpload = true;
    const id = Math.random().toString(36).substring(2); // Tạo ra 1 name riêng cho mỗi DB firebase;
    this.ref = this.angularfireStorage.ref(id);
    this.ref.put(this.file).then(snapshot => {
      return snapshot.ref.getDownloadURL(); // Tra ve 1 chuoi sieu van ban tren FB.
    }).then( downloadURL => { // chuyen giao link tu nhung component khac nhau khi su upload
      this.url = downloadURL;
      this.giveURLtoCreate.emit(this.url);
      this.checkUpload = false;
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`);
      });
  }

}
