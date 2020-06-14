import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { ScorecardKanbanComponent } from './shared/components/scorecard-kanban/scorecard-kanban.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./layouts/default/default-modules/default.module').then( module => module.DefaultModule)},
    {path: 'network', loadChildren: () => import('./layouts/network/network-modules/network.module').then( module => module.NetworkModule)},
    {path: 'auth', loadChildren: () => import('./layouts/auth/auth-modules/auth-module.module').then( module => module.AuthModule)},
    {path: 'kanban', component: ScorecardKanbanComponent}, // FOR TESTING KANBAN
    {path: 'not-found', component: ErrorPageComponent, data: {errorMessage: 'Page not found!'} },
    {path: '**', redirectTo: '/not-found' }


];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{ }
