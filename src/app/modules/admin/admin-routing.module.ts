import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurvayListComponent } from './components/survay/survay-list/survay-list.component';
import { BuildComponent } from './components/survay/build/build.component';
import { WorkingSystemListComponent } from './components/working_system/working-system-list/working-system-list.component';
import { WorkingSystemBuildComponent } from './components/working_system/working-system-build/working-system-build.component';
import { TranslationResolverService } from 'src/app/shared/translation-resolver.service';
import { TenantBuildComponent } from './components/Tenant/tenant-build/tenant-build.component';
import { TenantListComponent } from './components/Tenant/tenant-list/tenant-list.component';
import { BranchListComponent } from './components/branches/branch-list/branch-list.component';
import { BranchBuildComponent } from './components/branches/branch-build/branch-build.component';
import { AccessTenantListComponent } from './components/AccessTenants/access-tenant-list/access-tenant-list.component';
import { AccessBranchListComponent } from './components/AccessBranches/access-branch-list/access-branch-list.component';
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

const routes: Routes = [{
   path:'',component:IndexComponent,
   resolve:{translate:TranslationResolverService},
   children:[
    {path:'',component:DashboardComponent},
    {path:'survay_list',component:SurvayListComponent},
    {path:'survay_build/:id',component:BuildComponent},
    {path:'Working_System_List',component:WorkingSystemListComponent},
    {path:'Working_System_build/:id',component:WorkingSystemBuildComponent},
    {path:'tenant_list',component:TenantListComponent},
    {path:'tenant_build/:id',component:TenantBuildComponent},
    {path:'branch_list',component:BranchListComponent},
    {path:'branch_build/:id',component:BranchBuildComponent},
    {path:'access_tenant_list',component:AccessTenantListComponent},
    {path:'access_branch_list',component:AccessBranchListComponent},
    {path:'tenant_subscription_list',component:TenantSubscriptionListComponent},
    {path:'tenant_subscription_update/:id',component:TenantSubscriptionAddComponent},
    {path:'tenant_data',component:TenantDataComponent},
    {path:'Manage_support_users_list',component:ManageSupportListComponent},
    {path:'Branch_manager_list',component:BranchManagerListComponent},
    {path:'Configure_style_list',component:ConfigureStyleListComponent},
    {path:'Configure_POS_list',component:ConfigurePosListComponent},
    {path:'Configure_Payment_list',component:ConfigurePaymentListComponent},
    {path:'survay_result',component:SurvayResultListComponent},
    {path:'reservation_list',component:ReservationListComponent},
    {path:'reservation_details/:id',component:ReservationDetailsComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
