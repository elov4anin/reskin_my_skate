import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class ToastNotificationService {
    constructor(public toastController: ToastController) {
    }

    init() {
        this.toastController.create({animated: false}).then(t => {
            t.present().then();
            t.dismiss().then();
        });
    }

    async error(message: string, duration?: number): Promise<void> {
        await this.presentToast(message, 'danger', duration);
    }

    async success(message: string, duration?: number): Promise<void> {
        await this.presentToast(message, 'success', duration);
    }

    async info(message: string, duration?: number): Promise<void> {
        await this.presentToast(message, 'primary', duration);
    }

    async presentToast(message: string, color: string = 'primary', duration: number = 2000): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration,
            color,
            position: 'top'
        });
        await toast.present();
    }

    async presentOfflineToast() {
        const toast = await this.toastController.create({
            message: 'Вы не подключены к Интернет',
            duration: 3000,
            buttons: [
                {
                    text: 'Закрыть',
                    role: 'cancel',
                    handler: () => {
                        this.toastController.dismiss();
                    }
                }
            ]
        });
        await toast.present();
    }
}
