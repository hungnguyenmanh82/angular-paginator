import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  // ko dùng
  //@Input() numberItemPerPage: number;
  /**
     <app-paginator
        [totalItems]="100"
        [selectedPage]="1"
        [totalPages]="10"
        (pageChange)="onPageChange($event)"
     ></app-paginator>
   */
  @Input() totalItems: number;
  //
  @Input() selectedPage: number;
  @Input() totalPages: number;
  /**
   * Parent html:
   *        <app-output (output2)="callback($event)">
   *
   *  nếu ko đặt tên thì lấy tên biến làm tên attribute
   *  EventEmitter<T> là bắt buộc khi dùng @output. đây là class hỗ trợ của Angular
   *  this.pageChange.emit(this.selectedPage);
   */
  @Output() pageChange = new EventEmitter<number>(); // number: là ouput

  constructor() {}

  ngOnInit(): void {
    this.updateButtonsStatus();
  }
  // SelectedPage input Enter
  public onEnter() {
    //step1: check validation
    if (this.selectedPage < 1) {
      this.selectedPage = 1;
    } else if (this.selectedPage > this.totalPages) {
      this.selectedPage = this.totalPages;
    }

    this.updateButtonsStatus();
  }

  isStartDisable: boolean;
  isBackwardDisable: boolean;
  isForwardDisable: boolean;
  isEndDisable: boolean;
  private updateButtonsStatus() {
    //
    if (this.selectedPage == 1) {
      this.isStartDisable = true;
      this.isBackwardDisable = true;
      this.isForwardDisable = false;
      this.isEndDisable = false;
    } else if (this.selectedPage == this.totalPages) {
      this.isStartDisable = false;
      this.isBackwardDisable = false;
      this.isForwardDisable = true;
      this.isEndDisable = true;
    } else {
      this.isStartDisable = false;
      this.isBackwardDisable = false;
      this.isForwardDisable = false;
      this.isEndDisable = false;
    }

    //step2: send selectedPage to @Output
    this.pageChange.emit(this.selectedPage);
  }

  public onStartClick() {
    this.selectedPage = 1;
    //
    this.updateButtonsStatus();
  }

  public onBackwardClick() {
    if (this.selectedPage > 1) {
      this.selectedPage--;
    }

    this.updateButtonsStatus();
  }
  public onEndClick() {
    this.selectedPage = this.totalPages;
    //
    this.updateButtonsStatus();
  }

  public onForwardClick() {
    if (this.selectedPage < this.totalPages) {
      this.selectedPage++;
    }
    this.updateButtonsStatus();
  }
}
