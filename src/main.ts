import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { locationreducer } from './app/store/location.reducer';
import { provideHttpClient } from '@angular/common/http';
import {provideRouter} from '@angular/router'
import { routes } from './app/app.routes';

bootstrapApplication(App, {...appConfig,providers:[provideStore({location:locationreducer}),provideHttpClient(),provideRouter(routes)]})
  .catch((err) => console.error(err));
