import Joi from 'joi';

import contextValidationScheme from './contextValidationScheme';

export default Joi.array()
    .unique((contextOne, contextTwo) => contextOne.name === contextTwo.name)
    .items(contextValidationScheme);