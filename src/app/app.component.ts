import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedPage: number;

  public onPageChange(selectedPage: number) {
    //send selectedPage to Server
    this.selectedPage = selectedPage;
  }
}
