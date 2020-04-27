import { ApiService } from './api.service';
import { ErrorInterceptor, TokenInterceptor } from './token.service';
import { NotificationService } from './notification.service';

export const service = [
  ApiService,
  TokenInterceptor,
  ErrorInterceptor,
  NotificationService
];
