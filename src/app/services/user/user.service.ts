import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpUserRequest } from 'src/app/models/interfaces/user/SignUpUserRequest';
import { SignUpUserResponse } from 'src/app/models/interfaces/user/SignUpUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/authResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  signUpUser(requestDatas: SignUpUserRequest): Observable<SignUpUserResponse> {

      return this.http.post<SignUpUserResponse>(
        `${this.API_URL}/user/create`,
        requestDatas
      )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/user/auth`, requestDatas
    )
  }
}
