import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  userDetails = {} as User;
  showImage: boolean = true;
  imageUrl: string = '';
  selectedImage: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    debugger
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params != undefined) {
          this.userDetails.firstName = params["firstName"];
          this.userDetails.lastName = params["lastName"];
          this.userDetails.age = params["age"];
          this.userDetails.email = params["email"];
          this.userDetails.phone = params["phone"];
          this.userDetails.state = params["state"];
          this.userDetails.country = params["country"];
          this.userDetails.interest = params["interest"];
          this.userDetails.address1 = params["address1"];
          this.userDetails.address2 = params["address2"];
          this.userDetails.companyAddress1 = params["companyAddress1"];
          this.userDetails.companyAddress2 = params["companyAddress2"];
          this.userDetails.imageUrl = params["image"];
          this.userDetails.interest= JSON.parse(this.userDetails.interest)
        }
      },
      error => { }
    );
  }
  editProfile() {
    this.router.navigate(["/register"]);
    localStorage.removeItem("User");
    localStorage.setItem("User", JSON.stringify(this.userDetails));
  }
  editPhoto() {
    this.showImage = false;
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
    this.userDetails.imageUrl = image;
    this.showImage = true;
  }
}
