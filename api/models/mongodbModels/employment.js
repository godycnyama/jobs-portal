'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Employment
  * @description contain the details of Attribute  
*/
var EmploymentSchema = new Schema({
  email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  jobTitle: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  jobLevel:{type:String,required:true,enum:['None','Junior','Skilled','Senior','Management','Executive'],trim :true ,minlength:1,maxlength:50},
  jobType: { type: String, required: true, enum: ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer']},
  companyName: { type: String, required: true,trim :true,minlength:1,maxlength:50 },
  companySector: { type: String, required: true, trim: true, enum: ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
            'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
            'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Health & Safety', 'Health Fitness & Beauty',
            'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
            'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
            'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
            'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other']
  },
  locationTown: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  locationCountry: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  startMonth: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  endMonth: { type: String, trim: true, maxlength: 50 },
  startYear: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  endYear: { type: String, trim: true, maxlength: 50 },
  isCurrent: { type: Boolean,Default :false },
  duties: { type: String, required: true,trim :true ,minlength:1,maxlength:10000 },
  reasonsForLeaving: { type: String, trim: true, maxlength: 150 },
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
EmploymentSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // change the updated_at field to current date
    this.updatedOn = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.createdOn)
        this.createdOn = currentDate;
    next();
});

EmploymentSchema.plugin(autoIncrement.plugin,'Employment');
var Employment = mongoose.model('Employment', EmploymentSchema);

/** export schema */
module.exports = Employment; 
