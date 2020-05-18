import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  success(title: string, message: string) {
    this.toastr.success(message, title);
  }

  error(title: string, message: string) {
    switch (title) {
      case 'Status 401':
        message = 'Token Expires !';
        break;
      case 'Status 404':
        message = 'Api Not Found !';
        break;
      case 'Status 500':
        message = 'Server Error !';
        break;
      default:
        break;
    }
    this.toastr.error(message, title);
  }

  warning(title: string, message: string) {
    this.toastr.warning(message, title);
  }
}
