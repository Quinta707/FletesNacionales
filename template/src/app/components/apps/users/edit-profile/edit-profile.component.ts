import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public myProfile: UntypedFormGroup;
  public editProfile: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      bio: ['On the other hand, we denounce with righteous indignation'],
      email: ['', [Validators.email]],
      password: [''],
      website: [],
    });
    this.editProfile = this.fb.group({
      company: [''],
      userName: [''],
      email: ['', Validators.email],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      zipCode: [null],
      country: [''],
      about: ['']
    })
  }

}
