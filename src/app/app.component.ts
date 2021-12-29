import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PasswordChecker } from './custom-validators/password-checker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'signup-responsiveform';
  signupForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
      this.signupForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTandC: [false, Validators.requiredTrue]
      }, {
        validators: PasswordChecker('password','confirmPassword' )
      });
  }

  // helper function
  get h(){
    return this.signupForm.controls
  }

  onSubmit(){
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }

    console.table("Form values...\n" + JSON.stringify(this.signupForm.value))
    console.log("-----------------------------------------")
    console.log(this.signupForm)

    alert("Success Signup\n" + JSON.stringify(this.signupForm.value))
  }

  onReset(){
    this.submitted = false
    this.signupForm.reset()
  }
}
