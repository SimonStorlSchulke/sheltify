/*  */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SheltifyAccessConfig } from '../../ng-sheltify/src/lib/sheltify-access.config';

SheltifyAccessConfig.strapi.baseUrl = window.location.origin.startsWith("http://localhost") ?
  "http://localhost:1337"
  : "https://cms.herzenshunde-griechenland.de";
SheltifyAccessConfig.strapi.bearer = window.location.origin.startsWith("http://localhost") ?
  "ab97f536a82b5e8c9e6202677f87bbe2427fe53690f6c5d74d5f03445cea93a211a17b0f8cb8c620e432ea8ff6c469f4bd4bacfe21056f18bba726c2c6aa7d1ca15e7e2fe12e16bb75f21f1794fb4fa6c68b29cf86a2718e37a1fcf8a8534d4debdb495e507d65c3e03a0a697718de10f93e2a577bfd7922860f4e1e601e593d"
  : "6612d88a2c0b99340a0fc8d18cec7b31012bbf20c2b0545e35bea181775f1d7632630cba6e2831f907aaefac616727242a69a2ed5fdaf20a829de88013475beef3b425d64c53f2c86a59a0356b619136bc237754a616ba397763b463924f68fa88e69a5d3002f349f2a623d093bd9fdebc490a6f8cfd6a52157737dde1bcdfe0";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

