


skills: Joi.array().items(
        Joi.object().keys({
            skillID:Joi.string().required().trim().min(1).max(40),
            username: Joi.string().required().trim().min(1).max(40),
            description:Joi.string().required().trim().min(1).max(40),
            level:Joi.string().required().trim().min(1).max(40),
            experience:Joi.string().required().trim().min(1).max(40),
            lastDate:Joi.string().required().trim().min(1).max(40),
            isCurrent:Joi.boolean().required() 
        })
    ) 