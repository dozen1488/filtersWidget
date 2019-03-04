import Joi from 'joi';

export default Joi.object().keys({
    selectedContexts: Joi.array(),
    selectedDimensions: Joi.array(),
    selectedFields: Joi.array()
});