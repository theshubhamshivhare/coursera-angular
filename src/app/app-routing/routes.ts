import { ContactComponent } from './../contact/contact.component';
import { MenuComponent } from './../menu/menu.component';
import { HomeComponent } from './../home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  { path: 'contactus', component: ContactComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
