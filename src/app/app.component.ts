import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

interface ISlipResponse {
  slip: ISlip;
}

interface ISlip {
  id: number;
  advice: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  adviceEndpoint = 'https://api.adviceslip.com/advice';

  slip$: Observable<ISlipResponse> = this.http.get<ISlipResponse>(this.adviceEndpoint);

  constructor(
    private readonly http: HttpClient,
  ) {}

  fetchAdvice() {
    this.slip$ = this.http.get<ISlipResponse>(this.adviceEndpoint).pipe(
      catchError(err => of({
          slip: {
            id: 0,
            advice: err.message,
          }
        })
      )
    );
  }

}
