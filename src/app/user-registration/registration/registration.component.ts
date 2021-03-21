import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { User } from "../models/user.model";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  registrationForm = {} as FormGroup;
  addressValue: boolean = false;
  sports: any;
  userDetails = {} as User;
  companyAddress: boolean = false;
  namePattern: string = "^[a-zA-Z -']+";
  edit: boolean = false;
  displayImage: string = '';
  showImage: boolean = false;
  imageUrl: string = '';
  selectedImage: any;
  range: any;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sports = [
      { name: 'Cricket', code: 'CR' },
      { name: 'Football', code: 'FT' },
      { name: 'Hockey', code: 'HK' },
      { name: 'Tennis', code: 'TN' },
      { name: 'Basket Ball', code: 'BB' }
    ];
    this.userDetails = {} as User;
    this.validateRegistrationForm();
    if (localStorage.getItem("User")) {
      this.userDetails = JSON.parse(localStorage.getItem("User") || '{}')
      if (this.userDetails != undefined) {
        this.registrationForm?.controls['firstName'].setValue(this.userDetails.firstName);
        this.registrationForm?.controls['lastName'].setValue(this.userDetails.lastName);
        this.registrationForm?.controls['age'].setValue(this.userDetails.age);
        this.registrationForm?.controls['email'].setValue(this.userDetails.email);
        this.registrationForm?.controls['phone'].setValue(this.userDetails.phone);
        this.registrationForm?.controls['state'].setValue(this.userDetails.state);
        this.registrationForm?.controls['country'].setValue(this.userDetails.country);
        this.registrationForm?.controls['interest'].setValue(this.userDetails.interest);
        this.registrationForm?.controls['address1'].setValue(this.userDetails.address1);
        this.registrationForm?.controls['address2'].setValue(this.userDetails.address2);
        this.registrationForm?.controls['companyAddress1'].setValue(this.userDetails.companyAddress1);
        this.registrationForm?.controls['companyAddress2'].setValue(this.userDetails.companyAddress2);
      }
    }
  }
  validateRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.namePattern)
        ])
      ],
      lastName: [""],
      age: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      address: ["", Validators.required],
      interest: ["", Validators.required],
      address1: [""],
      address2: [""],
      companyAddress1: [""],
      companyAddress2: [""]
    });
  }
  saveData(userForm: FormGroup) {
    debugger
    let navigationExtras: NavigationExtras = {
      queryParams: {
        firstName: userForm.value.firstName,
        lastName: userForm.value.lastName,
        age: this.range.value,
        email: userForm.value.email,
        phone: userForm.value.phone,
        state: userForm.value.state,
        country: userForm.value.country,
        interest: JSON.stringify(userForm.value.interest),
        address1: userForm.value.address1,
        address2: userForm.value.address2,
        companyAddress1: userForm.value.companyAddress1,
        companyAddress2: userForm.value.companyAddress2,
        image: this.displayImage
      },
      skipLocationChange: true
    };
    this.router.navigate(["/profile"], navigationExtras);
  }
  onAddressChange() {
    var value = this.registrationForm.controls["address"].value;
    if (value != "" && value == "H") {
      this.addressValue = true;
      this.registrationForm.get('address1').setValidators([Validators.required])
      this.registrationForm.get('address1').updateValueAndValidity();
      this.registrationForm.get('address2').setValidators([Validators.required])
      this.registrationForm.get('address2').updateValueAndValidity();
    }
    else if (value != "" && value == "C") {
      this.companyAddress = true;
      this.registrationForm.get('companyAddress1').setValidators([Validators.required])
      this.registrationForm.get('companyAddress1').updateValueAndValidity();
      this.registrationForm.get('companyAddress2').setValidators([Validators.required])
      this.registrationForm.get('companyAddress2').updateValueAndValidity();
    } else {
      this.addressValue = false;
      this.companyAddress = false;
    }
  }
  selectedFile(event: any) {
    let resultantImage = this;
    this.selectedImage = <File>event?.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = function (event: any) {
      resultantImage.imageUrl = event.target.result;
      resultantImage.base64imageUrl(resultantImage.imageUrl);
    };
  }
  base64imageUrl(image: string) {
    this.displayImage = image;
    this.showImage = true;
  }
  ageRange(value: Event) {
    this.range = value;
  }
}
