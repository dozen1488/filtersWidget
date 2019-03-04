import Joi from 'joi';

import contextValidationScheme from './contextValidationScheme';
import workPanelValidationScheme from './workPanelValidationScheme';

export default Joi.object().keys({
    workPanels: Joi.array().items(
        Joi.object().keys({
            contexts: Joi.array().items(contextValidationScheme),
            workPanel: workPanelValidationScheme
        })
    )
});