import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router
    ) {}

  ngOnInit(): void {
    document.body.style.backgroundImage = 'url(assets/images/NotFoundBg.jpg)'
  }

  routeToDashboard() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    document.body.style.backgroundImage = 'none';
  }
}
