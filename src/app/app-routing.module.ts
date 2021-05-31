import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/notfound/app.notfound.component';
import {AppErrorComponent} from './pages/error/app.error.component';
import {AppAccessdeniedComponent} from './pages/accessdenied/app.accessdenied.component';
import {AppLoginComponent} from './pages/login/app.login.component';
import {InfomationComponent} from './pages/infomation/infomation.component';
import {BasicdriverComponent} from './pages/basicdriver/basicdriver.component';
import {PenaltyComponent} from './pages/penalty/penalty.component';
import {PropertyComponent} from './pages/property/property.component';
import {TechnicalComponent} from './pages/technical/technical.component';
import {TrafficComponent} from './pages/traffic/traffic.component';
import {TypedriverlicenseComponent} from './pages/typedriverlicense/typedriverlicense.component';
import {QuestionComponent} from './pages/question/question.component';
import {ExamComponent} from './pages/exam/exam.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppLoginComponent},
            {
                path: 'home', component: AppMainComponent,
                children: [
                    {path: 'information', component: InfomationComponent},
                    {path: 'basicdriver', component: BasicdriverComponent},
                    {path: 'penalty', component: PenaltyComponent},
                    {path: 'property', component: PropertyComponent},
                    {path: 'technical', component: TechnicalComponent},
                    {path: 'traffic', component: TrafficComponent},
                    {path: 'typedriverlicense', component: TypedriverlicenseComponent},
                    {path: 'question', component: QuestionComponent},
                    {path: 'exam', component: ExamComponent},
                    
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
