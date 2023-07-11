import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { HTTP } from '@awesome-cordova-plugins/http/ngx'; //? TEMP

// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx'; //? TEMP

// import { Camera } from '@awesome-cordova-plugins/camera/ngx'; //? TEMP

// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; //? TEMP

// import { File } from '@awesome-cordova-plugins/file/ngx'; //? TEMP

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppComponent,
    // HTTP, //? TEMP
    // ScreenOrientation, //? TEMP
    // Camera, //? TEMP
    // SQLite, //? TEMP
    // File //? TEMP
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
