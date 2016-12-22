import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/Rx"
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
})

export class FileUploadComponent {
    errorMessage: string;
    method: "POST";
    constructor(private http: Http, private el: ElementRef) {}

    upload() {

        let inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length > 0) { // a file was selected
            let file:File = inputEl.files[0];
            console.log(file);
        let headers =  new Headers({'Content-Type': 'application/json; charset=UTF-8'});
            this.http.post('http://0.0.0.0:8000/upload/', file, { headers: headers})


          .subscribe(error =>  this.errorMessage = <any>error)

                // do whatever you do...
                // subscribe to observable to listen for response
        }
    }
}
