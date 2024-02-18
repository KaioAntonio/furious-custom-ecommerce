import { SignUpUserRequest } from './../../models/interfaces/user/SignUpUserRequest';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signUpForm = this.formBuilder.group({
    username:['',Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    age: [0, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService) {
  }

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response?.username}`,
                life: 2000,
              });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao realizar o login!`,
            life: 2000,
          });
        console.log(err);
      }
    });
  }
  }

  onSubmitSignUpForm(): void {
    if(this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signUpUser(this.signUpForm.value as SignUpUserRequest)
      .subscribe({
        next: (response) => {
            if(response) {
              this.signUpForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário criado ${response?.username} criado com sucesso!`,
                life: 2000,
              });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao realizar o login!`,
            life: 2000,
          });
        console.log(err);
      }
      })
    }
  }

}
