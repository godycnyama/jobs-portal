

employment: Joi.array().items(
      Joi.object().keys({
          employmentID: Joi.string().required().trim().min(1).max(40),
          username: Joi.string().required().trim().min(1).max(40),
          jobTitle: Joi.string().required().trim().min(1).max(40),
          jobLevel: Joi.string().required().trim(), //e.g 'None','Junior','Skilled','Senior','Management','Executive'
          jobType: Joi.string().required().trim(), //e.g 'Permanent','Contract','Temporary'
          companyName: Joi.string().required().trim().min(1).max(40),
          companySector: Joi.string().required().trim(), //e.g 'Engineering','Construction','Education','Hospitality','Medical'
          dateStarted: Joi.string().required().trim().min(1).max(40),
          dateEnded: Joi.string().required().trim().min(1).max(40),
          isCurrent: Joi.boolean().required(),
          location: Joi.string().required().trim().min(1).max(40),
          duties: Joi.string().required().trim().min(1).max(1000),
          salary: Joi.string().required().trim().min(1).max(40),
          disableSalary: Joi.boolean().required(),
          reasonOfLeaving: Joi.string().required().trim().min(1).max(40)
      })
        )