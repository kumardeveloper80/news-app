import { ApiUrl } from './api-url';
import { environment } from '../../../environments/environment';

export const GlobalConstants = {
    Host: environment.Host,
    HeaderValues: {
        ApplicationJSON: 'application/json',
    },
    ApiUrl: ApiUrl,
};
