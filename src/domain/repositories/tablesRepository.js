import * as queryString from 'query-string';
import Joi from 'joi';

import { SERVER_PATH, routes } from '../../constants/config.json';
import errorCodes from '../../constants/errorCodes';

import contextValidationScheme from '../validationSchemes/contextValidationScheme';
import dimensionValidationScheme from '../validationSchemes/dimensionValidationScheme';

const { TABLES_ROUTE, DIMENSIONS_ROUTE, CONTEXT_ROUTE, FIELDS_ROUTE } = routes;

class TablesRepository {
    getTables() {
        return fetch(
            SERVER_PATH + TABLES_ROUTE + CONTEXT_ROUTE, {
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

    getDimensions(contextId) {
        return fetch(
            SERVER_PATH + TABLES_ROUTE + DIMENSIONS_ROUTE + '?' + queryString.stringify({ contextId }),
            {
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((dimensions) => {
                try {
                    return dimensions.filter(dimension => !dimensionValidationScheme.validate(dimension).error);
                } catch (error) {
                    throw new Error(errorCodes.INVALID_RESPONSE_OBJECT);
                }
            });
    }

    getFields(contextId, dimensionName) {
        return fetch(
            SERVER_PATH + TABLES_ROUTE + FIELDS_ROUTE + '?' + queryString.stringify({ contextId, dimensionName }),
            {
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((fields) => {
                try {
                    return fields.filter(field => !(Joi.string().validate(field)).error);
                } catch (error) {
                    throw new Error(errorCodes.INVALID_RESPONSE_OBJECT);
                }
            });
    }
}

export default new TablesRepository();