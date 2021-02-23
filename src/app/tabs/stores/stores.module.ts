import { NgModule } from '@angular/core';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoresPageRoutingModule
  ],
  declarations: [StoresPage]
})
export class StoresPageModule {}
