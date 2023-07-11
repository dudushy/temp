import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { File } from '@awesome-cordova-plugins/file/ngx';

import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppComponent,
    HTTP,
    ScreenOrientation,
    Camera,
    SQLite,
    File,
    BackgroundMode,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
