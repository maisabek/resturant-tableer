import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';

const materialComponents=[
  MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatButtonModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatTooltipModule,
  CdkAccordionModule,
  MatProgressBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatStepperModule,
  MatMenuModule
]
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports:[
    materialComponents
  ]
})
export class MaterialModule { }
