import { RequestOptionsArgs } from '@angular/http';

export interface User {
    avatar: string;
    first_name: string;
    id: number;
    last_name: string;
}

export interface RequestArgsCustom extends RequestOptionsArgs {
    throbbing?: boolean;
}
