import { group, animate, state, style, transition, trigger, query as q, stagger, animateChild, sequence } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routerTransition =
    trigger('routerTransition', [
        transition('* <=> *', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
            query(':enter', style({ opacity: '0', transform: 'scale(0.0)' })),
            sequence([
                query(':leave', animateChild()),
                group([
                    query(':leave', [
                        style({ opacity: 1, transform: 'scale(1.0)' }),
                        animate('500ms', style({ opacity: 0, transform: 'scale(0.0)' }))]),
                    query(':enter', [
                        style({ opacity: 0, transform: 'scale(0.0)' }),
                        animate('500ms', style({ opacity: 1, transform: 'scale(1.0)' }))])
                ]),
            ]),
            query(':enter', animateChild()),
        ])
    ]);


export const staggerTransition =
    trigger('staggerTransition', [
        transition(':enter', [
            query('.wave', style({ opacity: 0 })),
            query('.wave', stagger(300, [
                style({ transform: 'translateY(10px)' }),
                animate('100ms', style({ transform: 'translateY(0px)', opacity: '1' }))
            ]))
        ]),
        transition(':leave', [
            query('.wave', stagger(300, [
                style({ transform: 'translateY(0px)' }),
                animate('100ms', style({ transform: 'translateY(10px)', opacity: '0' }))
            ]))
        ])
    ]);
