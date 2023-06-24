import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routed/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./routed/options/options.module').then((m) => m.OptionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
