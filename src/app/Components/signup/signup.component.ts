import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpObj } from '../Models/signup.model';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/Services/signup.service';
import { catchError, throwError } from 'rxjs';
import { noSpacesValidator } from 'src/app/Services/checkvalidation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  SignupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', { validators: [Validators.required, noSpacesValidator] }),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),
    mobileNumber: new FormControl(''),
    telephoneNumber: new FormControl('', Validators.required),
    brandName: new FormControl('', Validators.required),
    deliveryName: new FormControl('', Validators.required),
    deliveryStreet: new FormControl('', Validators.required),
    deliveryHouseNr: new FormControl('', Validators.required),
    deliveryPostcode: new FormControl('', Validators.required),
    deliveryCity: new FormControl('', Validators.required),
    deliveryCountry: new FormControl('', Validators.required),
    billingName: new FormControl(''),
    billingStreet: new FormControl(''),
    billingHouseNr: new FormControl(''),
    billingPostcode: new FormControl(''),
    billingCity: new FormControl(''),
    billingCountry: new FormControl(''),
    contactPersons: new FormArray([
      new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        telephone: new FormControl('', Validators.required),
        mobile: new FormControl(''),
        email: new FormControl(''),
        country: new FormControl('')
      })
    ])
  });

  isBilling: boolean = false;
  constructor(private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    public signupService: SignupService
  ) {
  }

  ngOnInit(): void {

  }

  get ContactPerson() {
    return this.SignupForm.get('contactPersons') as FormArray;
  }
  addContactPerson(): void {
    const contactPersons = this.SignupForm.get('contactPersons') as FormArray;
    contactPersons.push(new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required,),
      telephone: new FormControl('', Validators.required),
      mobile: new FormControl(''),
      email: new FormControl(''),
      country: new FormControl('')
    }));
    this.cdr.detectChanges();
  }

  removeContactPerson(index: number) {
    const contactPersons = this.SignupForm.get('contactPersons') as FormArray;
    contactPersons.removeAt(index);
  }

  showHideBilling() {
    this.isBilling = !this.isBilling;
  }

  onSave() {
    if (this.SignupForm.valid) {
      const signupDTO: SignUpObj = this.SignupForm.value;

      signupDTO.contactPersons.forEach((obj, index) => {
        obj.id = String(index+1);
      });

      console.log(signupDTO)

      this.signupService.post(signupDTO).subscribe(res => {
        console.log(signupDTO);
        this.SignupForm.reset();
        this.toastr.success('Successfully Signed Up', 'Success', {
          positionClass: "toast-bottom-center",
          timeOut: 3000
        });
      });
    }
    else {
      const emailControl = this.SignupForm.get('email');
      if (emailControl?.errors?.['email']) {
        this.toastr.error('Please enter a valid email address.', 'Error', {
          positionClass: "toast-bottom-center",
          timeOut: 3000
        });
      } else {
        this.toastr.error('Please fill all * required fields', 'Error', {
          positionClass: "toast-bottom-center",
          timeOut: 3000
        });
      }
    }
  }


}
