import { SERVER_PATH, routes } from '../constants/config.json';
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
            .then(response => response.json());
        }
}

export default new TablesRepository();