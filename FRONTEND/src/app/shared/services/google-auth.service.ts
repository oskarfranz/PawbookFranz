import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { RegisterService } from 'src/app/shared/services/register.service';
import { AuthService } from 'src/app/shared/services/auth.service';





const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/home',
  clientId: '539745089995-lui95he53kvrarc5jbv42kn04lp7sqq9.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  form: FormGroup;
  users: any = [];
  succesfullyAdd: boolean = false;
  role: boolean = false;
  user: any;


  constructor( private authService: AuthService, private formBuilder: FormBuilder, private readonly oAuthService: OAuthService, private userService: UserService,  private registerService: RegisterService) { 
    this.form = formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'username' : ['', Validators.required],
      'age' : ['', Validators.required],
      'cellphone' : ['', Validators.required],
      'email' : ['', [Validators.required, Validators.email]], //si quereos mas de una valid van entre []
      'password' : ['', [Validators.required, Validators.minLength(8)]],
      'confirm': ['', [Validators.required, Validators.minLength(8)]],
      'role': ['', Validators.required],
      'ocupation': [''],
      'organization': [''],
      'location': ['']
    })

    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })

    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl ='https://www.google.com/accounts/Logout'
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
      })
    })
    
  }

  getPrevLogin() {
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
        if(this.oAuthService.hasValidAccessToken()){
          console.log('Valid token');
          this.oAuthService.loadUserProfile().then( (profile) => {

            this.user = JSON.parse(JSON.stringify(profile));
            console.log(this.user)  
            //PARSE user profile to form
            this.form.value.email = this.user.info.email;
            this.form.value.name = this.user.info.given_name;
            this.form.value.lastname = this.user.info.family_name;
            this.form.value.role = -1;

            this.authService.googleSave('token', this.user.info.email, this.form.value.role);

            

           

            if(this.users.find((user: any) => user.email === this.form.value.email)){
              console.log('User already registered'); //si el email ya esta dado de alta
            } else{
              console.log(this.users)
              console.log('User not registered')
              this.registerService.registerUser(this.form.value).subscribe(response => {
                console.log(response);
                this.succesfullyAdd= true;
              });
            }

            //registerGoogleUser(this.form);
          }).catch(error => {
              console.log('Hey');
          });

        } else {
          console.log('Not logged with Google');
        }
      })
    })
  }

  signOut() {
    this.oAuthService.logOut();
  }

  login() {
    this.oAuthService.initLoginFlow();
  }



  getProfile() {
    this.getPrevLogin();
  }
}
