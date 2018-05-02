

qualifications: Joi.array().items(
       Joi.object().keys({
           qualificationID: Joi.string().trim().min(1).max(40),
           username: Joi.string().required().trim().min(1).max(40),
           name: Joi.string().required().trim().min(1).max(40),
           level: Joi.string().required().trim().min(1).max(40),
           institution: Joi.string().required().trim().min(1).max(40),
           country: Joi.string().required().trim().min(1).max(40),
           yearCompleted: Joi.string().required().trim().min(1).max(40),
           status: Joi.string().required().trim(), //e.g.'Complete','InComplete','In Progress'
           majors: Joi.string().required().trim().min(1).max(1000)
       })
   )