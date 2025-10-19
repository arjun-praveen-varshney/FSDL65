import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
student = {
name: '',
age: null,
email: '',
};
submitted = false;


onSubmit(form: NgForm) {
if (form.valid) {
this.submitted = true;
console.log('Form submitted:', this.student);
}
}
}
