


consultants: Joi.array().includes(
            Joi.object.keys({
                username: Joi.string().required().trim().min(1).max(40),
                firstName: Joi.string().required().trim().min(1).max(40),
                middleName: Joi.string().required().trim().min(1).max(40),
                lastName: Joi.string().required().trim().min(1).max(40),
                jobTitle: Joi.string().required().trim().min(1).max(40),
                tel: Joi.string().required().trim().min(1).max(40),
                mobile: Joi.string().required().trim().min(1).max(40),
                email: Joi.string().required().trim().min(1).max(40)
            })
       )