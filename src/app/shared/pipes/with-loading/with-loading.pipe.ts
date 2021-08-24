import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { WithLoading } from './models/with-loading.models';

@Pipe({
    name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
    transform(val): Promise<WithLoading> {
        return isObservable(val)
            ? val.pipe(
                map((value: any) => ({ loading: false, value })),
                startWith({ loading: true }),
                catchError(error => of({ loading: false, error }))
            )
            : val;
    }
}