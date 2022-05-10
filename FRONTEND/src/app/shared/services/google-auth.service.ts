import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

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

  constructor(private readonly oAuthService: OAuthService) { 
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
            console.log('User: ' + JSON.stringify(profile));

            localStorage.setItem('google-token', 'haha');
          }).catch(error => {
              console.log('Hey');
          });

        } else {
          console.log('Invalid token');
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
