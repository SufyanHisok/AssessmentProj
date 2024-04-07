import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpObj } from '../Components/Models/signup.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl = "https://mbotapi.azurewebsites.net/auth/signup"
  constructor(private http:HttpClient,public toastService:ToastrService) { }

  post(data: SignUpObj): Observable<any> {
    return this.http.post<any>(this.apiUrl, data)
      .pipe(
        catchError(error => {
          this.toastService.error(error.message,'Error', {
            positionClass:"toast-bottom-center",
            timeOut:3000 });

          return throwError(() => new Error('Something wrong with api req'));
        })
      );
  }
}
