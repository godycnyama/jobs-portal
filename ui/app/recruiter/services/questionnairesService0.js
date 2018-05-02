var questionnaireServiceModule = angular.module('questionnaireServiceModule', []);
questionnaireServiceModule.factory('QuestionnaireService', ['$http', function ($http) {

    var general = [];
    var education = [];
    var experience = [];
    var skills = [];
    var questionnaire = []
    return {
        SaveQuestionnaire: function (){
            questionnaire.push(general);
            questionnaire.push(education);
            questionnaire.push(experience);
            questionnaire.push(skills)
        },
        GetGeneralQuestions: function(){
            return general
        },
        SaveGeneralQuestion: function(question){
            general.push(question)
            return
        },
        GetEducationQuestions: function () {
            return education
        },
        SaveEducationQuestion: function (question) {
            education.push(question)
            return
        },
        GetExperienceQuestions: function () {
            return experience
        },
        SaveExperienceQuestion: function (question) {
            experience.push(question)
            return
        },
        GetSkillsQuestions: function () {
            return experience
        },
        SaveSkillsQuestion: function (question) {
            skills.push(question)
            return
        },
        SaveQuestion: function (question) { ['Text', 'Text Area', 'Check Box','MultiCheckBox', 'Multiple Choice Radio Buttons', 'Multiple Choice Dropdown List']
            switch (question.category) {
                case 'General':
                    if (question.type == 'Text') {
                        var textQuestion = {
                            type: 'input',
                            templateOptions: {
                                type: 'text',
                                label:question.text
                            }
                        }
                        general.push(textQuestion);
                        break;
                        
                    } else if (question.type == 'Text Area') {
                                var textAreaQuestion = {
                                        type: 'textarea',
                                        templateOptions: {                                            
                                            label: question.text,
                                            rows: 4,
                                            cols:10
                                       }
                                }
                                general.push(textAreaQuestion);
                                break;

                    } else if (question.type == 'Check Box') {
                                    var checkBoxQuestion = {
                                            type: 'checkbox',
                                            templateOptions: {
                                                label: question.text
                                        }
                                    }
                                    general.push(checkBoxQuestion);
                                    break;

                    } else if (question.type == 'MultiCheckBox') {
                        var multiCheckBox = {
                            id: null,
                            title: ""
                        };
                        var multiCheckBoxOptions = [];
                        for (var i = 0; i < question.answerOptions.length; i++) {
                            multiCheckBox.title = question.answerOptions[i];
                            multiCheckBox.id = i;
                            multiCheckBox.push(radio);


                        };
                        var multiCheckBoxQuestion = {
                                            type: 'multiCheckbox',
                                            templateOptions: {
                                                label: question.text,
                                                options: multiCheckBoxOptions,
                                                valueProp:id ,
                                                labelProp:title
                                            }
                                    }
                                    general.push(multiCheckBoxQuestion);
                                    break;
                    } else if (question.type == 'Multiple Choice Radio Buttons') {
                        var radio = {
                            name: "",
                            value: null
                        };
                        var radioOptions = [];
                        for (var i = 0; i < question.answerOptions.length; i++) {
                            radio.name = question.answerOptions[i];
                            radio.value = i;
                            radioOptions.push(radio);


                        };
                        var multiChoiceRadioQuestion = {
                                    type: 'radio',
                                    templateOptions: {
                                         label: question.text,
                                         options: radioOptions
                                            }
                                    }
                                    general.push(multiChoiceRadioQuestion);
                                    break;
                    } else if (question.type == 'Multiple Choice Dropdown List') {
                        var select = {
                            name: ""
                        };
                        var selectOptions = [];
                        for (var i = 0; i < question.answerOptions.length; i++) {
                            select.name = question.answerOptions[i];
                            selectOptions.push(select);


                        };
                        var multiChoiceDropdownQuestion = {
                            type: 'select',
                            templateOptions: {
                                label: question.text,              
                                valueProp: name,
                                options: selectOptions,
                            }
                        }
                        general.push(multiChoiceRadioQuestion);
                        break;
                    }
                    
                case 'Education':
                    if (question.type == 'Text') {
                        var textQuestion = {
                            type: 'input',
                            templateOptions: {
                                type: 'text',
                                label:question.text
                            }
                        }
                        education.push(textQuestion);
                        break;
                        
                    } else if (question.type == 'Text Area') {
                        var textAreaQuestion = {
                            type: 'textarea',
                            templateOptions: {                                            
                                label: question.text,
                                rows: 4,
                                cols:10
                            }
                        }
                        education.push(textAreaQuestion);
                        break;

                    } else if (question.type == 'Check Box') {
                        var checkBoxQuestion = {
                            type: 'checkbox',
                            templateOptions: {
                                label: question.text
                            }
                        }
                        education.push(checkBoxQuestion);
                        break;

                    } else if (question.type == 'MultiCheckBox') {
                        var multiCheckBoxQuestion = {
                            type: 'multiCheckbox',
                            templateOptions: {
                                label: question.text,
                                options: question.answerOptions,
                                valueProp: text,
                                labelProp: score
                            }
                        }
                        education.push(multiCheckBoxQuestion);
                        break;
                    }
                case 'Experience':
                    if (question.type == 'Text') {
                        var textQuestion = {
                            type: 'input',
                            templateOptions: {
                                type: 'text',
                                label: question.text
                            }
                        }
                        experience.push(textQuestion);
                        break;

                    } else if (question.type == 'Text Area') {
                        var textAreaQuestion = {
                            type: 'textarea',
                            templateOptions: {
                                label: question.text,
                                rows: 4,
                                cols: 10
                            }
                        }
                        experience.push(textAreaQuestion);
                        break;

                    } else if (question.type == 'Check Box') {
                        var checkBoxQuestion = {
                            type: 'checkbox',
                            templateOptions: {
                                label: question.text
                            }
                        }
                        experience.push(checkBoxQuestion);
                        break;

                    } else if (question.type == 'MultiCheckBox') {
                        var multiCheckBoxQuestion = {
                            type: 'multiCheckbox',
                            templateOptions: {
                                label: question.text,
                                options: question.answerOptions,
                                valueProp: text,
                                labelProp: score
                            }
                        }
                        experience.push(multiCheckBoxQuestion);
                        break;
                    }
                    
                case 'Skills':
                    if (question.type == 'Text') {
                        var textQuestion = {
                            type: 'input',
                            templateOptions: {
                                type: 'text',
                                label: question.text
                            }
                        }
                        skills.push(textQuestion);
                        break;

                    } else if (question.type == 'Text Area') {
                        var textAreaQuestion = {
                            type: 'textarea',
                            templateOptions: {
                                label: question.text,
                                rows: 4,
                                cols: 10
                            }
                        }
                        skills.push(textAreaQuestion);
                        break;

                    } else if (question.type == 'Check Box') {
                        var checkBoxQuestion = {
                            type: 'checkbox',
                            templateOptions: {
                                label: question.text
                            }
                        }
                        skills.push(checkBoxQuestion);
                        break;

                    } else if (question.type == 'MultiCheckBox') {
                        var multiCheckBoxQuestion = {
                            type: 'multiCheckbox',
                            templateOptions: {
                                label: question.text,
                                options: question.answerOptions,
                                valueProp: text,
                                labelProp: score
                            }
                        }
                        skills.push(multiCheckBoxQuestion);
                        break;
                    }
                    
            }
        }
        
    }
}]);