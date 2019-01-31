import Joi from 'joi';

export default Joi.object().keys({
    dimensionName: Joi.string(),
    fields: Joi.array().items(Joi.string())
})