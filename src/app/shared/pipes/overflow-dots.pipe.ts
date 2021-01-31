import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'appOverflowDots'
})
export class OverflowDotsPipe implements PipeTransform {

    transform(value: string, limit: number): string {
        if (value == null) {
            return '';
        }
        const str = this.strip(value);
        return str.length > limit ? str.slice(0, limit) + '...' : str;
    }

    strip(html: string) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }
}
