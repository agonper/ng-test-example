import {Component} from '@angular/core';
import {AlarmasService} from './dispositivos/servicios/alarmas.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-test-example';
  alarmas$: Observable<Array<number>>;

  constructor(private servicioAlarmas: AlarmasService) {
    this.alarmas$ = servicioAlarmas.alarmas$;
  }
}
