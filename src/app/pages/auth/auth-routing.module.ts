import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthRoutesEnum} from "./auth-routes.enum";

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${AuthRoutesEnum.ROOT}/` + AuthRoutesEnum.LOGIN,
        pathMatch: 'full'
    },
    {
        path: AuthRoutesEnum.LOGIN,
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: AuthRoutesEnum.REG,
        loadChildren: () => import('./reg/reg.module').then(m => m.RegPageModule)
    },
    {
        path: AuthRoutesEnum.FORGOT_PASS,
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
    },


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
