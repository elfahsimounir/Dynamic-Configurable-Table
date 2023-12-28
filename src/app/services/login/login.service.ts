import { Injectable } from '@angular/core'
import anime from 'animejs'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isFocused = 'email'
  email: string = 'elfahssimounir7@gmail.com'
  password: string = '1111Aa@#'
  incEmail: boolean = false
  incpassword: boolean = false
  showPassword: boolean = false
  welcome: boolean = false
  submited: boolean = false
  contetShow: boolean = false
  private currentAnimation: any = null

  constructor(private cookieService: CookieService, private router: Router) { }
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
  onEmailFocus(): void {
    this.startAnimation('#emailPath', 0, '240 1386')
    this.isFocused = 'email'
  }
  onPasswordFocus(): void {
    this.startAnimation('#emailPath', -336, '240 1386')
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
    const isLengthGreaterThan8 = this.password.length > 8
    if (isLengthGreaterThan8) {
      return hasCapitalLetter && hasSpecialCharacter && hasNumericDigit
    } else {
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

  submitHandlter() {
    if (this.email !== 'elfahssimounir7@gmail.com') {
      this.incEmail = true
    }
    if (this.password !== '1111Aa@#') {
      this.incpassword = true
    }
    if (
      this.email === 'elfahssimounir7@gmail.com' &&
      this.password === '1111Aa@#'
    ) {
      this.welcome = true
      this.contetShow = true
      this.cookieService.set('approved', 'true', 7)
      setTimeout(() => {
        this.router.navigate(['/home/details'])
        this.welcome=false
      }, 3000)
    }
    this.submited = true
    setTimeout(() => {
      this.submited = false
    }, 3000)
  }

  incHandler(option: string): void {
    if (option === 'email') {
      this.incEmail = false
    } else if (option === 'password') {
      this.incpassword = false
    }
  }
  correctPassword(): boolean {
    return this.password === '1111Aa@#'
  }
correctEmail(): boolean {
    return this.email === 'elfahssimounir7@gmail.com'}
}
