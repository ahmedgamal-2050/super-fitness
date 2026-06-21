import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Error Interceptor
 * Globally handles HTTP errors and provides consistent error handling
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client Error: ${error.error.message}`;
        console.error('Client-side error:', error.error.message);
      } else {
        // Backend error
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Bad Request';
            console.error('Bad Request (400):', errorMessage);
            break;

          case 403:
            errorMessage =
              'Forbidden. You do not have permission to access this resource.';
            console.error('Forbidden (403):', errorMessage);
            break;

          case 404:
            errorMessage = error.error?.message || 'Resource not found';
            console.error('Not Found (404):', errorMessage);
            break;

          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            console.error('Internal Server Error (500):', error.error);
            break;

          case 503:
            errorMessage = 'Service Unavailable. Please try again later.';
            console.error('Service Unavailable (503):', error.error);
            break;

          default:
            errorMessage =
              error.error?.message ||
              `Error: ${error.status} - ${error.statusText}`;
            console.error(`HTTP Error (${error.status}):`, error.error);
            break;
        }
      }

      // Return error with user-friendly message
      return throwError(() => ({
        status: error.status,
        message: errorMessage,
        originalError: error,
        apiErrorMessage: error.error?.message ?? '',
      }));
    })
  );
};
