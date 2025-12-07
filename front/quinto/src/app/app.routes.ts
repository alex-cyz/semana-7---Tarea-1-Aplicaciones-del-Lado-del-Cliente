import { Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado';
import { ServicioComponent } from './servicio/servicio';

export const routes: Routes = [
    {
        path: 'empleados',
        component: EmpleadoComponent,
        pathMatch: 'full'
    },
    {
        path: 'servicios',
        component: ServicioComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full'
    }
];
