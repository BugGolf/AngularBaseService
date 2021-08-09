import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { BSConfig, BS_CONFIG } from "./bs-config";
import { BSService } from "./bs-service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [],
})
export class BSServiceModule {
  static forRoot(config: BSConfig): ModuleWithProviders {
    return {
      ngModule: BSServiceModule,
      providers: [{ provide: BS_CONFIG, useValue: config }, BSService],
    }
  }
}