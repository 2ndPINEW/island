import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IslandComponent } from './modules/island/island.component';
import { StoreModule } from '@ngrx/store';
import { islandSurfaceColorReducer } from './modules/island/island.reducer';

@NgModule({
  declarations: [AppComponent, IslandComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        islandSurfaceColor: islandSurfaceColorReducer,
      },
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
