import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '@Services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  signup!: SignupService;
  constructor(private signUpServices:SignupService) {}
  ngOnInit(): void { 
    this.signup=this.signUpServices
}
}
