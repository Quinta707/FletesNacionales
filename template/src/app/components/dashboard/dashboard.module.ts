import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CountToModule } from "angular-count-to";
import { ChartistModule } from "ng-chartist";
import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";

import { DefaultComponent } from "./default/default.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { WelcomeComponent } from "./default/welcome/welcome.component";
import { StatusComponent } from "./default/status/status.component";
import { OverallBalanceComponent } from "./default/overall-balance/overall-balance.component";
import { RecentOrdersComponent } from "./default/recent-orders/recent-orders.component";
import { ActivityComponent } from "./default/activity/activity.component";
import { RecentSalesComponent } from "./default/recent-sales/recent-sales.component";
import { TimelineComponent } from "./default/timeline/timeline.component";
import { PurchaseAccountComponent } from "./default/purchase-account/purchase-account.component";
import { TotalUsersComponent } from "./default/total-users/total-users.component";
import { FollowersGrowthComponent } from "./default/followers-growth/followers-growth.component";
import { PaperNoteComponent } from "./default/paper-note/paper-note.component";
import { OrdersProfitComponent } from "./default/orders-profit/orders-profit.component";
import { OrdersComponent } from "./default/orders-profit/orders/orders.component";
import { ProductStatusChartBoxComponent } from "./default/product-status-chart-box/product-status-chart-box.component";
import { LeftContentComponent } from "./ecommerce/left-content/left-content.component";
import { RightTopCategoriesComponent } from "./ecommerce/right-top-categories/right-top-categories.component";
import { OrderBoardComponent } from "./ecommerce/left-content/order-board/order-board.component";
import { ValuableCustomerComponent } from "./ecommerce/left-content/valuable-customer/valuable-customer.component";
import { MonthlyOrderComponent } from "./ecommerce/left-content/monthly-order/monthly-order.component";
import { MonthlyProfitsComponent } from "./ecommerce/left-content/monthly-profits/monthly-profits.component";
import { OrderOverviewComponent } from "./ecommerce/left-content/order-overview/order-overview.component";
import { DiscoverProComponent } from "./ecommerce/left-content/discover-pro/discover-pro.component";
import { VisitorsComponent } from "./ecommerce/left-content/visitors/visitors.component";
import { ProfitComponent } from "./default/orders-profit/profit/profit.component";
import { RecentOrdersTableComponent } from "./ecommerce/left-content/recent-orders-table/recent-orders-table.component";
import { ProductTableComponent } from './ecommerce/left-content/recent-orders-table/product-table/product-table.component';
import { RightChartDataComponent } from './ecommerce/left-content/order-overview/right-chart-data/right-chart-data.component';
import { OnlineCourseComponent } from './online-course/online-course.component';
import { HelloNameComponent } from './online-course/hello-name/hello-name.component';
import { TodayProgressComponent } from './online-course/today-progress/today-progress.component';
import { MoreDetailsComponent } from './online-course/more-details/more-details.component';
import { CalendarComponent } from './online-course/calendar/calendar.component';
import { LearningOverviewComponent } from './online-course/learning-overview/learning-overview.component';
import { ActivityHoursComponent } from './online-course/activity-hours/activity-hours.component';
import { UpcomingEventsComponent } from './online-course/upcoming-events/upcoming-events.component';
import { UpcomingScheduleComponent } from './online-course/upcoming-schedule/upcoming-schedule.component';
import { MyCourseComponent } from './online-course/my-course/my-course.component';
import { ActiveLessonsComponent } from './online-course/active-lessons/active-lessons.component';
import { CryptoComponent } from './crypto/crypto.component';
import { CryptoLeftContentComponent } from './crypto/crypto-left-content/crypto-left-content.component';
import { CryptoMiddleContentComponent } from './crypto/crypto-middle-content/crypto-middle-content.component';
import { CryptoRightContentComponent } from './crypto/crypto-right-content/crypto-right-content.component';
import { AverageComponent } from './crypto/crypto-left-content/average/average.component';
import { TransactionsComponent } from './crypto/crypto-left-content/transactions/transactions.component';
import { CoinComponent } from './crypto/crypto-middle-content/coin/coin.component';
import { MarketGraphComponent } from './crypto/crypto-middle-content/market-graph/market-graph.component';
import { CurrenciesComponent } from './crypto/crypto-middle-content/currencies/currencies.component';
import { BuyCoinsComponent } from './crypto/crypto-middle-content/buy-coins/buy-coins.component';
import { SellCoinsComponent } from './crypto/crypto-middle-content/sell-coins/sell-coins.component';
import { BalanceProfileComponent } from './crypto/crypto-right-content/balance-profile/balance-profile.component';
import { PortfolioComponent } from './crypto/crypto-right-content/portfolio/portfolio.component';
import { ActivitiesComponent } from './crypto/crypto-right-content/activities/activities.component';
import { SocialComponent } from './social/social.component';
import { SocialUserProfileComponent } from './social/social-user-profile/social-user-profile.component';
import { MobileApplicationComponent } from './social/mobile-application/mobile-application.component';
import { SocialMediaComponent } from './social/social-media/social-media.component';
import { SocialMediaChartComponent } from './social/social-media/social-media-chart/social-media-chart.component';
import { SubscribersComponent } from './social/social-media/subscribers/subscribers.component';
import { ClicksChartsComponent } from './social/social-media/clicks-charts/clicks-charts.component';
import { FollowerGenderComponent } from './social/follower-gender/follower-gender.component';
import { CampaignComponent } from './social/campaign/campaign.component';
import { AllCampaignsComponent } from './social/all-campaigns/all-campaigns.component';
import { ViewsComponent } from './social/views/views.component';
import { CoursesComponent } from './online-course/hello-name/courses/courses.component';
import { SaleStatusComponent } from './ecommerce/left-content/order-board/sale-status/sale-status.component';
@NgModule({
  declarations: [
    DefaultComponent,
    EcommerceComponent,
    WelcomeComponent,
    StatusComponent,
    OverallBalanceComponent,
    RecentOrdersComponent,
    ActivityComponent,
    RecentSalesComponent,
    TimelineComponent,
    PurchaseAccountComponent,
    TotalUsersComponent,
    FollowersGrowthComponent,
    PaperNoteComponent,
    OrdersProfitComponent,
    ProfitComponent,
    OrdersComponent,
    ProductStatusChartBoxComponent,
    LeftContentComponent,
    RightTopCategoriesComponent,
    OrderBoardComponent,
    ValuableCustomerComponent,
    MonthlyOrderComponent,
    MonthlyProfitsComponent,
    OrderOverviewComponent,
    DiscoverProComponent,
    VisitorsComponent,
    RecentOrdersTableComponent,
    ProductTableComponent,
    RightChartDataComponent,
    OnlineCourseComponent,
    HelloNameComponent,
    TodayProgressComponent,
    MoreDetailsComponent,
    CalendarComponent,
    LearningOverviewComponent,
    ActivityHoursComponent,
    UpcomingEventsComponent,
    UpcomingScheduleComponent,
    MyCourseComponent,
    ActiveLessonsComponent,
    CryptoComponent,
    CryptoLeftContentComponent,
    CryptoMiddleContentComponent,
    CryptoRightContentComponent,
    AverageComponent,
    TransactionsComponent,
    CoinComponent,
    MarketGraphComponent,
    CurrenciesComponent,
    BuyCoinsComponent,
    SellCoinsComponent,
    BalanceProfileComponent,
    PortfolioComponent,
    ActivitiesComponent,
    SocialComponent,
    SocialUserProfileComponent,
    MobileApplicationComponent,
    SocialMediaComponent,
    SocialMediaChartComponent,
    SubscribersComponent,
    ClicksChartsComponent,
    FollowerGenderComponent,
    CampaignComponent,
    AllCampaignsComponent,
    ViewsComponent,
    CoursesComponent,
    SaleStatusComponent,
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, CKEditorModule, CountToModule, NgbModule, FormsModule, DashboardRoutingModule],
  exports: [
    CoinComponent,
    ProductStatusChartBoxComponent,
    CoursesComponent,
    SocialMediaChartComponent,
    OrdersComponent,
    ProfitComponent,
    SaleStatusComponent,
    BalanceProfileComponent,
    CalendarComponent,
    AverageComponent,
    TotalUsersComponent
  ]
})
export class DashboardModule {}
