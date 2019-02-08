import jest from 'jest-mock';

import errorCodes from '../../constants/errorCodes';
import tablesRepository from '../../repositories/tablesRepository';

describe('tablesRepository', () => {
    it('should correctly process response', () => {
        const contexts = [
            {
                "dimensions": [
                    {
                        "fields": [
                            "Dimension1",
                            "Dimension2",
                        ],
                        "dimensionName": "Table one"
                    }
                ],
                "name": "First Context",
                "id": "1"
            }
        ];
        global.fetch = jest.fn((params) => {
            return Promise.resolve({
                json: () => {
                    return [
                        {
                            "dimensions": [
                                {
                                    "fields": [
                                        "Dimension1",
                                        "Dimension2",
                                    ],
                                    "dimensionName": "Table one"
                                }
                            ],
                            "name": "First Context",
                            "id": "1"
                        }
                    ];
                }
            })
        });
        tablesRepository.getTables()
            .then(retrievedContexts => {
                expect(retrievedContexts).toEqual (contexts);
            });
    });
    it('should emit error on invalid response', () => {
        global.fetch = jest.fn((params) => {
            return Promise.resolve({
                json: () => {
                    return {};
                }
            })
        });
        
        tablesRepository.getTables()
            .catch(error => {
                expect(error).toHaveProperty('message', errorCodes.INVALID_RESPONSE_OBJECT);
            });
    });
});