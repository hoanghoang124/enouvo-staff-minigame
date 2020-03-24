import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token = this.authService.isLoggedIn();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigate(["login"]);
        }
        return throwError(err);
      })
    );
  }
}
