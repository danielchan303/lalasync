import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './screens/home/home.component';
import { ConnectComponent } from './screens/connect/connect.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'connect/:id', component: ConnectComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // If you can redirect unknown path to the index.html
    // RouterModule.forRoot(appRoutes, {useHash: true}
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
