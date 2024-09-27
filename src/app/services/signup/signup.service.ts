import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import anime from 'animejs'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  isFocused = 'identification'

  email:string = '';
  password:string = '';
  confirmer:string='';
  identification:string='';
  contact:string='';
  adresse:string='';
  validation:string='';

  showPassword: boolean = false;
  private currentAnimation: any = null

  constructor(private router:Router) {}
  showPasswordHnadler() {
    this.showPassword = !this.showPassword
  }
  startAnimation(target: string, offsetValue: number, dashArray: string): void {
    if (this.currentAnimation) this.currentAnimation.pause()
    this.currentAnimation = anime({
      targets: target,
      strokeDashoffset: {
        value: offsetValue,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: dashArray,
        duration: 700,
        easing: 'easeOutQuart',
      },
    })
  }
  onConfirmerFocus(): void {
    this.startAnimation('#emailPath', 0, '240 1386')
    this.isFocused = 'confirmer'
  }
  onAdresseFocus(): void {
    this.startAnimation('#emailPath', -336, '240 1386')
    this.isFocused = 'adresse'
  }
  onIdentificationFocus(): void {
    this.startAnimation('#emailPath', 0, '240 1386')
    this.isFocused = 'identification'
  }
  onContactFocus(): void {
    this.startAnimation('#emailPath', -336, '240 1386')
    this.isFocused = 'contact'
  }
  onEmailFocus(): void {
    this.startAnimation('#emailPath', 0, '240 1386')
    this.isFocused = 'email'
  }
  onPasswordFocus(): void {
    this.startAnimation('#emailPath', 0, '240 1386')
    this.isFocused = 'password'
  }
  onSubmitFocus(): void {
    this.startAnimation('#emailPath', -730, '530 1000 1000')
    this.isFocused = 'submit'
  }
  checkString(): boolean {
    const hasCapitalLetter = /[A-Z]/.test(this.password)
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(this.password)
    const hasNumericDigit = /\d/.test(this.password)
    const isLengthGreaterThan8 = this.password.length >= 8
      if (isLengthGreaterThan8) {
          return hasCapitalLetter && hasSpecialCharacter && hasNumericDigit
      } else {
        return true
      }
  } 
  checkEquality():boolean{
   if(this.confirmer.length>=this.password.length){
    return this.confirmer===this.password
   }else{
    return true
   }
  }
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isLengthGreaterThan15 = this.email.length > 15
    if (isLengthGreaterThan15) {
      return emailRegex.test(this.email)
    } else {
      return true
    }
  }
  submitHandlte(){
    if (!(this.isEmailValid() && this.checkEquality() && this.checkString())) {
      this.validation = 'no';
      setTimeout(() => {
        this.validation=''
    }, 500);
    } else {
      this.validation = 'yes';
      setTimeout(() => {
        this.validation='';
        this.router.navigate(['/auth/signin'])
      }, 2000);
    }
  }
}