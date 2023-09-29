import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { SidenavComponent } from './components/layouts/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SideNavIconsComponent } from './components/layouts/side-nav-icons/side-nav-icons.component';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildComponent } from './components/survay/build/build.component';
import { SurvayListComponent } from './components/survay/survay-list/survay-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkingSystemListComponent } from './components/working_system/working-system-list/working-system-list.component';
import { WorkingSystemBuildComponent } from './components/working_system/working-system-build/working-system-build.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { TenantListComponent } from './components/Tenant/tenant-list/tenant-list.component';
import { TenantBuildComponent } from './components/Tenant/tenant-build/tenant-build.component';
import { BranchListComponent } from './components/branches/branch-list/branch-list.component';
import { BranchBuildComponent } from './components/branches/branch-build/branch-build.component';
import { AccessBranchListComponent } from './components/AccessBranches/access-branch-list/access-branch-list.component';
import { AccessBranchBuildComponent } from './components/AccessBranches/access-branch-build/access-branch-build.component';
import { AccessTenantBuildComponent } from './components/AccessTenants/access-tenant-build/access-tenant-build.component';
import { AccessTenantListComponent } from './components/AccessTenants/access-tenant-list/access-tenant-list.component';
import { TenantSubscriptionListComponent } from './components/tenant-subscription/tenant-subscription-list/tenant-subscription-list.component';
import { ManageSupportListComponent } from './components/manage-support-list/manage-support-list.component';
import { BranchManagerListComponent } from './components/branch-manager-list/branch-manager-list.component';
import { ConfigureStyleListComponent } from './components/configure-style-list/configure-style-list.component';
import { ConfigurePosListComponent } from './components/configure-pos-list/configure-pos-list.component';
import { ConfigurePaymentListComponent } from './components/configure-payment-list/configure-payment-list.component';
import { SurvayResultListComponent } from './components/survay-result-list/survay-result-list.component';
import { TenantDataComponent } from './components/tenant-data/tenant-data.component';
import { TenantSubscriptionAddComponent } from './components/tenant-subscription/tenant-subscription-add/tenant-subscription-add.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './components/reservation/reservation-details/reservation-details.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    IndexComponent,
    SidenavComponent,
    SideNavIconsComponent,
    ChatComponent,
    BuildComponent,
    SurvayListComponent,
    WorkingSystemListComponent,
    WorkingSystemBuildComponent,
    TenantListComponent,
    TenantBuildComponent,
    BranchListComponent,
    BranchBuildComponent,
    AccessBranchListComponent,
    AccessBranchBuildComponent,
    AccessTenantBuildComponent,
    AccessTenantListComponent,
    TenantSubscriptionListComponent,
    ManageSupportListComponent,
    BranchManagerListComponent,
    ConfigureStyleListComponent,
    ConfigurePosListComponent,
    ConfigurePaymentListComponent,
    SurvayResultListComponent,
    TenantDataComponent,
    TenantSubscriptionAddComponent,
    ReservationListComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    CdkAccordionModule,
    NgApexchartsModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
  ]
})
export class AdminModule { }
