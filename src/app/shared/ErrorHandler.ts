import {HttpErrorResponse} from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

export class ErrorHandler {

  constructor(private toastr: ToastrService){}

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      this.toastr.error(`Server Side Error : ${errorResponse}`, '',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      })
      this.toastr.error(`Client Side Error : ${errorResponse.error.message}`, '',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      })
    } else {
      return alert('please refresh the website again, maybe there are problems with the server!!');
    }
  }
}
