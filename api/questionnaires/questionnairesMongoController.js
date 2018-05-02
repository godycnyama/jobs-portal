'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Questionnaire = require('../models/mongodbModels/questionnaire'),
  mongoose = require('mongoose');


exports.getAllQuestionnaires = {
    handler: function (request, reply) {
        Questionnaire.find({}, function (err, questionnaires) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaires,try again"));
            } else {
                if (questionnaires) {
                    return reply(questionnaires);
                } else {
                    return reply(Boom.notFound("No questionnaires found"));
                }
            }
        });
    }
};
exports.getQuestionnairesByRecruiterID = {
    handler: function (request, reply) {
        Questionnaire.find({'recruiterID': request.payload.recruiterID }, function (err, questionnaires) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaires) {
                    return reply(questionnaires);
                } else {
                    return reply(Boom.notFound("No questionnaires found"));
                }
            }
        });
    }
};

exports.getQuestionnaireByID = {
    handler: function (request, reply) {
        Questionnaire.findOne({ '_id': request.payload.questionnaireID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaire) {
                    return reply(questionnaire);
                } else {
                    return reply(Boom.notFound("No questionnaire found"));
                }
            }
        });
    }
};
exports.getQuestionnaireByREF = {
    handler: function (request, reply) {
        Questionnaire.find({ 'REF': request.payload.questionnaireREF, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaire) {
                    return reply(questionnaire);
                } else {
                    return reply(Boom.notFound("No questionnaire found"));
                }
            }
        });
    }
};

exports.getQuestionnaireByTitle = {
    handler: function (request, reply) {
        Questionnaire.find({ 'title': request.payload.title, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaire) {
                    return reply(questionnaire);
                } else {
                    return reply(Boom.notFound("No questionnaire found"));
                }
            }
        });
    }
};

exports.getQuestionsCount = {
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaire) {
                    var count = questionnaire.questions.index;
                    return reply(count);
                } else {
                    return reply(Boom.notFound("No questionnaire found"));
                }
            }
        });
    }
};

exports.createQuestionnaire = {
    validate: {
        payload: {
            questionnaireREF: Joi.string().required().trim().min(1).max(40),
            recruiterID: Joi.number().integer().required(),
            title: Joi.string().required().trim().min(1).max(40),
        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ 'questionnaireREF': request.payload.questionnaireREF, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while creating questionnaire,try again"));
            }
            if(questionnaire){
                return reply(Boom.badRequest("A questionnaire with ID" + questionnaire.questionnaireREF + "already exists ,please choose another REF"));
            }
            if(!questionnaire){
                var questionnaire = new Questionnaire({
                    questionnaireREF: request.payload.questionnaireREF,
                    recruiterID: request.payload.recruiterID,
                    title: request.payload.title,
                    questionsTotal: 0,
                    lastQuestionNumber: 0,
                    questions: []
                });
                questionnaire.save(function (err, questionnaire0) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while creating  questionnaire,try again"));
                    }
                    if (!questionnaire0) {
                        return reply(Boom.badRequest("Could not create questionnaire,try again"));
                    }
                    if (questionnaire0) {
                        return reply({ message: "Questionnaire with ID" + questionnaire._id + "and REF" + questionnaire._id + "created successfully" });
                    }                   
                });
            }
        });
    }
};

exports.updateQuestionnaire = {
    validate: {
        payload: {
            questionnaireID: Joi.number().integer().required(),
            questionnaireREF: Joi.string().required().trim().min(1).max(40),
            recruiterID: Joi.number().integer().required(),
            title: Joi.string().required().trim().min(1).max(40),

        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while updating questionnaire,try again"));
            } else {
                if (questionnaire) {
                    questionnaire.questionnaireREF = request.payload.questionnaireREF;
                    questionnaire.title = request.payload.title;
                    questionnaire.save(function (err, questionnaire0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while updating questionnaire"+request.payload.questionnaireID+",try again"));
                        } else {
                            if (questionnaire0) {
                                return reply({ message: "Questionnaire" + questionnaire0._id + "with REF" + questionnaire0.questionnaireREF +"and Title"+ questionnaire0.title+"updated successfully" });
                            } else {
                                return reply(Boom.badRequest("Questionnaire" + questionnaire._id + "with REF" + questionnaire.questionnaireREF + "and Title" + questionnaire.title + "could not be updated,try again"));
                            }
                        }
                    });
                } else {
                    return reply(Boom.notFound("Questionnaire was not found"));
                }
            }


        });
    }
};

exports.addQuestion = {
    validate: {
        payload: {
            questionnaireID: Joi.number().integer().required(),
            recruiterID: Joi.number().integer().required(),
            question: Joi.string().required().trim().min(1).max(200),         
        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while updating questionnaire,try again"));
            }
            if (!questionnaire) {
                return reply(Boom.badRequest("Questionnaire was not found"));
            }
            if (questionnaire) {
                    var questionNumber = questionnaire.questions.index + 1;                   
                    questionnaire.questions.push({
                        description: request.payload.question                       
                    });
                    var questionsTotal = questionnaire.questions.index;
                    questionnaire.questionsTotal = questionsTotal;
                    questionnaire.lastQuestionNumber = questionNumber;
                    questionnaire.save(function (err, questionnaire0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while adding questions to questionnaire" + request.payload.questionnaireID + ",try again"));
                        }
                        if (!questionnaire0) {
                            return reply(Boom.badRequest("Questionnaire" + questionnaire._id + "with REF" + questionnaire.questionnaireREF + "and Title" + questionnaire.title + "could not be updated,try again"));
                        }
                        if (questionnaire0) {
                            return reply({ message: "Questionnaire" + questionnaire0._id + "with REF" + questionnaire0.questionnaireREF + "and Title" + questionnaire0.title + "updated successfully" });
                        }                
                    });
                } 
        });
    }
};

exports.updateQuestion = {
    validate: {
        payload: {
            questionnaireID: Joi.number().integer().required(),
            questionID: Joi.number().integer().required(),
            recruiterID: Joi.number().integer().required(),
            category: Joi.string().valid('General', 'Education', 'Experience', 'Skills'),
            type: Joi.string().valid('text', 'textarea', 'checkbox', 'multiCheckox', 'radio', 'select'),
            question: Joi.string().trim().max(200),
            options: Joi.array().items(Joi.string().trim().max(200)),
            answers: Joi.array().items(Joi.object().keys({
                text: Joi.string().trim().max(200),
                score: Joi.number().integer().min(0).max(10)
            }))
        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            }
            if (!questionnaire) {
                return reply(Boom.badRequest("Questionnaire" + request.payload.questionnaireID + "with REF" + request.payload.recruiterID + "was not found"));
            }
            if (questionnaire) {
                var question = questionnaire.questions.id(request.payload.questionID);
                if (!question) {
                    return reply(Boom.badRequest("Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "was not found"));
                }
                if (question) {
                    for (i = 0; i < questionnaire.questions.length; i++) {
                        if (questionnaire.questions[i]._id === request.payload.questionID) {
                            questionnaire.questions[i].category = request.payload.category;
                            questionnaire.questions[i].type = request.payload.type;
                            questionnaire.questions[i].question = request.payload.question;
                            questionnaire.questions[i].options = request.payload.options;
                            questionnaire.questions[i].answers = request.payload.answers;
                        }
                    }

                    questionnaire.save(function (err, questionnaire0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while deleting question" + request.payload.questionID + " from  questionnaire" + request.payload.questionnaireID + ",try again"));
                        }
                        if (!questionnaire0) {
                            return reply(Boom.badRequest("Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "was not found"));
                        }
                        if (questionnaire0) {
                            return reply({ message: "Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "deleted successfully" });
                        }                       
                    });
                } 

            }           
        });
    }
};

exports.deleteQuestion = {
    validate: {
        payload: {
            questionnaireID: Joi.number().integer().required(),
            questionID: Joi.number().integer().required(),
            recruiterID: Joi.number().integer().required(),
        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID, 'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            }
            if (!questionnaire) {
                return reply(Boom.badRequest("Questionnaire" + request.payload.questionnaireID + "with REF" + request.payload.recruiterID + "was not found"));
            }
            if (questionnaire) {
                var question = questionnaire.questions.id(request.payload.questionID);
                if (!question) {
                    return reply(Boom.badRequest("Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "was not found"));
                }
                if (question) {
                    questionnaire.questions.id(request.payload.questionID).remove();
                    var questionsTotal = questionnaire.questions.index;
                    questionnaire.questionsTotal = questionsTotal;
                    questionnaire.lastQuestionNumber = questionNumber;
                    for (i = 0; i < questionnaire.questions.index; i++) {
                        if (questionnaire.questions[i].questionNumber > question.questionNumber) {
                            questionnaire.questions[i].questionNumber = questionnaire.questions[i].questionNumber--
                        }                       
                    }
                    questionnaire.save(function (err, questionnaire0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while deleting question" + request.payload.questionID + " from  questionnaire" + request.payload.questionnaireID + ",try again"));
                        }
                        if (!questionnaire0) {
                            return reply(Boom.badRequest("Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "could not be deleted,try again"));
                        }
                        if (questionnaire0) {
                            return reply({ message: "Question" + request.payload.questionID + "from questionnaire" + request.payload.questionnaireID + "deleted successfully" });
                        }                       
                    });
                } 

            }
        });
    }
};
exports.deleteQuestionnaire = {
    validate: {
        payload: {
            questionnaireID: Joi.number().integer().required(),
            questionnaireREF: Joi.string().required().trim().min(1).max(40),
            recruiterID: Joi.number().integer().required(),
            title: Joi.string().required().trim().min(1).max(40),

        }
    },
    handler: function (request, reply) {
        Questionnaire.find({ '_id': request.payload.questionnaireID,'recruiterID': request.payload.recruiterID }, function (err, questionnaire) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for questionnaire,try again"));
            } else {
                if (questionnaire) {
                    questionnaire.remove();
                    return reply({ message: "Questionnaire"+questionnaire._id+"with REF"+questionnaire.questionnaireREF+" deleted successfully" });
                } else {
                    return reply(Boom.badRequest("Questionnaire"+request.payload.questionnaireID+"with REF"+request.payload.recruiterID+ "was not found"));
                }
            }
        });
    }
};

exports.deleteAllQuestionnaires = {
    handler: function (request, reply) {
        mongoose.connection.db.dropCollection('questionnaires', function (err, result) {
            if (err) {
                return reply(Boom.badRequest("Could not delete questionnaires"));

            } else {
                return reply({ message: "Questionnaires database successfully deleted" });
            }

        });
    }
};
