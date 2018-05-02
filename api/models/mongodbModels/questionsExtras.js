//textQuestions: [TextQuestion],
//    textAreaQuestions: [TextAreaQuestion],
//checkboxQuestions: [CheckboxQuestion],
//multicheckboxQuestions: [MulticheckboxQuestion],
//radioQuestions: [RadioQuestion],
//selectQuestions:[SelectQuestion]

var TextQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true,default:'input'},
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        type: { type: String, required: true, default: 'text' },
        placeholder: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 }
    }
});
TextQuestionSchema.plugin(autoIncrement.plugin, 'TextQuestion');
var TextQuestion = mongoose.model('TextQuestion', TextQuestionSchema);

var TextAreaQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true, default: 'textarea' },
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        placeholder: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
        rows: { type: Number, required: true, default: 4 },
        cols: { type: Number, required: true, default: 10 },
    }
});
TextAreaQuestionSchema.plugin(autoIncrement.plugin, 'TextAreaQuestion');
var TextAreaQuestion = mongoose.model('TextAreaQuestion', TextAreaQuestionSchema);

var CheckboxQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true, default: 'checkbox' },
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 }
    }
});
CheckboxQuestionSchema.plugin(autoIncrement.plugin, 'CheckboxQuestion');
var CheckboxQuestion = mongoose.model('CheckboxQuestion', CheckboxQuestionSchema);

var MulticheckboxQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true, default: 'multiCheckbox' },
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
        options: [{
            id: { type: Number, required: true},
            title: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
        }],
        valueProp: { type: String, required: true, default: 'id' },
        labelProp: { type: String, required: true, default: 'title' },
    }
});
MulticheckboxQuestionSchema.plugin(autoIncrement.plugin, 'MulticheckboxQuestion');
var MulticheckboxQuestion = mongoose.model('MulticheckboxQuestion', MulticheckboxQuestionSchema);

var RadioQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true, default: 'multiCheckbox' },
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
        options: [{
            name: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
            value: { type: Boolean, required: true},
        }]
    }
});
RadioQuestionSchema.plugin(autoIncrement.plugin, 'RadioQuestion');
var RadioQuestion = mongoose.model('RadioQuestion', RadioQuestionSchema);

var SelectQuestionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true, enum: ['General', 'Education', 'Work Experience', 'Skills'] },     // General,Education,Work Experience,Skills
    type: { type: String, required: true, default: 'select' },
    key: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    templateOptions: {
        label: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
        options: [{           
            name: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
        }],
        valueProp: { type: String, required: true, default: 'name' }        
    }
});
SelectQuestionSchema.plugin(autoIncrement.plugin, 'SelectQuestion');
var SelectQuestion = mongoose.model('SelectQuestion', SelectQuestionSchema);