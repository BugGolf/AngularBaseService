import { Component } from '@angular/core';
import { BSService } from '@buggolf/angular-base-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example';

  constructor(private bsService : BSService) {
    this.bsService.collection<any>('table').get().subscribe(
      res => {
        
      },
      err => {

      }
    )
  }
}
