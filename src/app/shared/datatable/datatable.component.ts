import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { SurvayService } from 'src/app/modules/admin/services/survay.service';
import { ListData } from '../models/list.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  data$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() method: any;
  @Input() service: any;
  @Input() columns: any[] = [];
  @Input() UpdateData: object = { isExist: false };
  @Input() ViewAndAddData: object = { isExist: false };
  @Input() DeleteIsExist: boolean = false;
  @Input() DetailsIsExist: boolean = false
  @Output() event: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective | any;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | any;
  private unsubscribe: Subscription[] = [];
  bg = ['btn-light-success', 'btn-light-danger', 'btn-light-warning'];
  constructor(public _SurvayService: SurvayService, private toastr: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.initDataTable()
    this.service.datatableRerender.subscribe((res: any) => {
      if (res) {
        this.rerender()
      }
    });
  }
  RandomColor:any[]=[]
  GetRandomColor(data:any) {
    for (let index = 0; index < data.length; index++) {
      this.RandomColor.push(this.bg[Math?.floor(Math?.random() * this.bg.length)])
    }

  }
  pageNumber: number = 1
  pgno: number = 0;
  protected dtOptions: DataTables.Settings = {};
  initDataTable() {
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      serverSide: true,
      processing: false,
      order: [[0, 'asc']],
      columns: this.columns,
      responsive: true,
      info: true,
      infoCallback: function (settings, start, end, max, total, pre) {
        return pre;
      },
      ajax: (dataTablesParameters: any, callback) => {
        const service_sub = this.service[this.method]({
          "pageNumber": parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1,
          "pageSize": dataTablesParameters.length,
          "searchText": dataTablesParameters.search.value,
          "sortColumn": this.columns[dataTablesParameters.order[0].column].data,
          "sortDirection": dataTablesParameters.order[0].dir
        }).subscribe((res: ListData) => {
          callback({
            recordsTotal: res.totalRowsCount,
            recordsFiltered: res.totalRowsCount,
            // data: res.data
          });

          this.data$.next(res.data);
          this.unsubscribe.push(service_sub)
          this.GetRandomColor(res.data)

        });
      },
      searching: true,

      columnDefs: [
        {
          targets: [3],
          searchable: false,
          "orderable": true
        },
      ]
    };
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.dtOptions.language = this.datatable_ar;
    } else if (localStorage.getItem('currentLanguage') == 'en') {
      this.dtOptions.language = this.datatable_en;
    }

  }

  dtTrigger: any = new Subject<any>();
  private datatable_ar = {
    decimal: '',
    emptyTable: 'لا توجد بيانات متوفرة في الجدول',
    info: ' اظهار من _START_ الى _END_  والمجموع الكلى _TOTAL_',
    infoEmpty: 'اظهار 0 ل 0 من 0 ',
    infoFiltered: '( تمت تصفيتها من إجمالي _MAX_ مدخلات)',
    infoPostFix: '',
    thousands: ',',
    lengthMenu: 'اظهار _MENU_ مدخلات',
    loadingRecords: 'تحميل...',
    processing: '',
    search: 'بحث:',
    zeroRecords: 'لم يتم العثور على سجلات مطابقة',
    paginate: {
      first: 'الاول',
      last: 'الاخير',
      next: 'التالى',
      previous: 'السابق',
    },
    aria: {
      sortAscending: ': تفعيل لفرز العمود تصاعديا',
      sortDescending: ': تفعيل لفرز العمود تنازلى',
    },
  };
  private datatable_en = {
    decimal: '',
    emptyTable: 'No data available in table',
    info: 'Showing _START_ to _END_ of _TOTAL_ Entries',
    infoEmpty: 'Showing 0 to 0 of 0 Entries',
    infoFiltered: '(filtered from _MAX_ total entries)',
    infoPostFix: '',
    thousands: ',',
    lengthMenu: ' _MENU_ ',
    loadingRecords: 'Loading...',
    processing: '',
    search: '<i class="fas fa-search text-muted mx-2"></i>',
    zeroRecords: 'No matching records found',
    paginate: {
      first: 'First',
      last: 'Last',
      next: 'Next',
      previous: 'Prev',
    },
    aria: {
      sortAscending: ': activate to sort column ascending',
      sortDescending: ': activate to sort column descending',
    },
  };

  rerender(): void {
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    } catch (err: any) {
      this.toastr.error(err.error.title, '', {
        progressBar: true,
        positionClass: 'toast-bottom-left',
      });
    }
  }

  update(id: string) {
    this.event.emit({ type: 'update', payload: id })
  }
  delete(id: string) {
    this.event.emit({ type: 'delete', payload: id })
  }

  details(id: string) {
    this.event.emit({ type: 'details', payload: id })
  }

  TogglePublished($event: any, slug: string) {
    this.event.emit({ type: 'published', payload: { id: slug, flag: $event } })
  }

  ToggleActive($event: any, slug: string) {
    console.log("$event = ",$event);

    this.event.emit({ type: 'active', payload: { id: slug, flag: $event } })
  }
  ToggleDefault($event: any, slug: string) {
    this.event.emit({ type: 'default', payload: { id: slug } })
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.dtOptions.language = this.datatable_ar;
        this.initDataTable();
        this.rerender();
      } else {
        this.dtOptions.language = this.datatable_en;
        this.initDataTable();
        this.rerender();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
