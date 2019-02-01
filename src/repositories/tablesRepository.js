import { SERVER_PATH, routes } from '../constants/config.json';

import contextValidationScheme from '../validationSchemes/contextValidationScheme';
import errorCodes from '../constants/errorCodes';

const { TABLES_ROUTE } = routes;

class TablesRepository {
    getTables() {
        return fetch(
            SERVER_PATH + TABLES_ROUTE, {
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((contexts) => {
                try {
                    return contexts.filter(context => !contextValidationScheme.validate(context).error);
                } catch (error) {
                    throw new Error(errorCodes.INVALID_RESPONSE_OBJECT);
                }
            });
    }
}

export default new TablesRepository();