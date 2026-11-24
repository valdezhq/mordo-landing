import { Component, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContactService } from '../../../core/contact.service';

@Component({
  selector: 'app-contact',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    NzAlertModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.less',
})

export class Contact {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private contactService = inject(ContactService);
  private message = inject(NzMessageService);
  private translate = inject(TranslateService);

  isBrowser = isPlatformBrowser(this.platformId);
  isSubmitting = false;
  submitError = false;
  private startedAt = Date.now();

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    company: ['', [Validators.required]],
    message: ['', [Validators.required]],
    website: [''],
  });

  onSubmit(): void {
    if (this.isSubmitting) return;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    this.contactService
      .send({ ...this.form.value, startedAt: this.startedAt, site: 'mordo' })
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (!res.ok) {
            this.submitError = true;
            return;
          }
          this.message.success(this.translate.instant('contact.formSuccess'));
          this.form.reset();
          this.startedAt = Date.now();
        },
        error: (err) => {
          console.error(this.translate.instant('contact.formError'), err);
          this.isSubmitting = false;
          this.submitError = true;
        },
      });
  }
}
