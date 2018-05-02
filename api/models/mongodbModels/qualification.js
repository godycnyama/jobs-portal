'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module Qualification
  * @description contain the details of Attribute  
*/
var QualificationSchema = new Schema({
  email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  title:{ type: String, required: true ,trim :true ,minlength:1,maxlength:50},
  level: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  institution:{ type: String, required: true ,trim :true ,minlength:1,maxlength:50 }, 
  locationTown: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  locationCountry: { type: String, required: true, enum: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
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
  startMonth: { type: String, required: true, enum:['January','February','March','April','May','June','July','August','September','October','November','December']},
  endMonth: { type: String, required: true, enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  status:{ type: String, required: true,enum: ['Complete','InComplete','In Progress']}, //complete,incomplete,in progress
  majors: { type: String, required: true, trim: true, minlength: 1, maxlength: 1000 },
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
QualificationSchema.pre('save', function (next) {
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

QualificationSchema.plugin(autoIncrement.plugin,'Qualification');
var Qualification = mongoose.model('Qualification', QualificationSchema);

/** export schema */
module.exports = Qualification;
