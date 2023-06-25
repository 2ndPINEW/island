import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IslandComponent } from './modules/island/island.component';
import { StoreModule } from '@ngrx/store';
import { islandReducer } from './modules/island/island.reducer';
import { ThreeComponent } from './modules/three/three.component';

@NgModule({
  declarations: [AppComponent, IslandComponent, ThreeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        island: islandReducer,
      },
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
