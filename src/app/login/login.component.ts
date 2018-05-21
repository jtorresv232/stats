import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
        iptUser: ['', Validators.required],
        defaultFormPass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

}
