'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//const mongooseSequence = require('mongoose-sequence');
const autoIncrement = require('../../config/db').autoIncrement;
const mongoosePaginate = require('mongoose-paginate');
const autoPopulate = require('mongoose-autopopulate');

/**
  * @module  JobAd
  * @description contain the details of Attribute  
*/
var JobAdSchema = new Schema({
  jobREF:{type:String,required:true,trim :true ,minlength:1,maxlength:50},
  jobTitle:{type:String,required:true,trim :true ,minlength:1,maxlength:50},
  jobLevel: { type: String, required: true, enum: ['Management', 'Supervisory', 'Junior', 'Skilled', 'Senior', 'Executive', 'None']},
  jobType: { type: String, required: true, enum: ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer']},
  companySector: {type: String, required: true, enum: ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
            'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
            'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Health & Safety', 'Health Fitness & Beauty',
            'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
            'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
            'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
            'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other']
  },
  employmentEquityPosition:{type: Boolean},
  disabilityOption: { type: String, required: true, enum: ['Yes', 'No', 'Only'] },
  createdOn: { type: Date},
  updatedOn: { type: Date},
  closingDate: { type: Date, required: true },
  expired: {type : Boolean,default: false},  
  jobLocationTown:{type:String,required:true,trim :true ,minlength:1,maxlength:50},
  jobLocationCountry: {type: String, required: true, enum: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
                'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
                'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic',
                'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', "Cote d'Ivoire", 'Croatia',
                'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador',
                'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
                'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
                'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
                'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi',
                'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
                'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
                'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
                'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
                'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
                'South Africa', 'South Africa-Gauteng', 'South Africa-Western Cape', 'South Africa-Eastern Cape', 'South Africa-Northern Cape', 'South Africa-KwaZulu-Natal', 'South Africa-Free State',
                'South Africa-Mpumalanga', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
                'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
                'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe']
  },
  salaryCurrency: {type: String, required: true, enum: ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD']
  },
  minimumSalary:{type:String,required:true,trim :true ,maxlength:50},
  maximumSalary:{type:String,required:true,trim :true ,maxlength:50},
  salaryNegotiable:{type:Boolean,required:true},
  hideSalary:{type:Boolean,required:true},
  salaryFrequency: { type: String, required: true, enum: ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year', 'Once off']},
  renumerationType: {type: String, required: true, enum: ['Basic Salary', 'Basic Salary Plus Benefits', 'Cost to Company', 'Cost to Company Incl Benefits', 'Commission Only', 'Commission Only Plus Benefits',
                'Basic Plus Commission', 'Basic Plus Commission and Benefits', 'On Target Earnings', 'On Target Earnings Plus Benefits']
  },
  renumerationMarketRelated:{type:Boolean,required:true},
  renumerationBenefits: { type: String, required: true, trim: true, minlength: 1, maxlength: 500 },
  introduction: { type: String, required: true, trim: true, minlength: 1, maxlength: 1000 },
  jobDescription: { type: String, required: true, trim: true, minlength: 1, maxlength: 1000 },
  jobRequirements: { type: String, required: true, trim: true, minlength: 1, maxlength: 1000 },
  applyOnline: { type: Boolean, required: true,default:true },
  howToApply: { type: String, trim: true, maxlength: 1000 },
  userID: { type: Number, required: true},
  company: { type: Number, required: true, ref: 'Recruiter', autopopulate: { select: 'companyName companyLogo recruiterType _id userID email introduction physicalAddress postalAddress tel mobile fax website' } },
  closed: { type: Boolean, required: true,default:false },
  paid: { type: Boolean, required: true,default:false }
  //hasQuestionnaire: {type:Boolean},
  //questionnaireID: { type: Number },
  //isQuestionnaireMandatory: {type:Boolean}
});

// on every save, add the date
JobAdSchema.pre('save', function (next) {
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
JobAdSchema.plugin(autoIncrement.plugin,'JobAd');
JobAdSchema.plugin(autoPopulate);
JobAdSchema.plugin(mongoosePaginate);
var JobAd = mongoose.model('JobAd', JobAdSchema);

/** export schema */
module.exports = JobAd;