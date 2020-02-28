import { Component } from '@angular/core';
import { Router, RouterState, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({templateUrl: 'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.pipe(map(p => p.id));
    // ...
  }
}
