import Joi from 'joi';

import dimensionValidationScheme from './dimensionValidationScheme';

export default Joi.object().keys({
    dimensions: Joi.array()
        .unique((contextOne, contextTwo) => contextOne.dimensionName === contextTwo.dimensionName)
        .items(dimensionValidationScheme),
    name: Joi.string(),
    id: Joi.string()
})