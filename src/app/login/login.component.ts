import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import {UserService} from '../user.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService,UserService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public error = '';
  public loading = false;
  public redirectUrl: string;


  constructor(private router: Router ,private activatedRoute: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private _http: HttpService) {
    this.loginForm = fb.group({
        iptUser: ['', Validators.required],
        iptPwd: ['', [Validators.required]]
    });
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit() {
    if(localStorage.getItem("identificacion")!=undefined){
      this.navigateAfterSuccess();
    }
  }

  private navigateAfterSuccess() {
    console.log(this.redirectUrl);
    if (this.redirectUrl) {
      console.log('entro por primero');
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      console.log('entro por segundo');
      this.router.navigate(['listaAlumnos']);
    }
  }


  authenticate(){
    var data={
      'identificacion':this.loginForm.value['iptUser'],
      'password': this.loginForm.value['iptPwd']
    };
    this._http.autenticarDocente(data).subscribe(res=>{
      console.log(res);
      this.userService.login(res);
      this.navigateAfterSuccess();
    }, err=>{
      console.log(err);
    });
  }

}
