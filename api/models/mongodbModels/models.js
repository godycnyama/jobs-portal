
function JobAdvert (){
    this.jobID;
    this.jobTitle;
    this.jobLevel;
    this.jobType;
    this.salaryCurrency;
    this.salaryMinimum;
    this.salaryMaximum;
    this.disableSalary;
    this.salaryFrequency;
    this.renumerationType;
    this.locationCountry;
    this.locationTown;
    this.recruiterName;
    this.recruiterType;  //e.g employer,agent
    this.datePosted;
    this.closingDate;
    this.applicationsLimit;
    this.jobDescription;
    this.jobRequirements;
    this.isDisabled;
   
};

function Employment (){
    this.employmentID;
    this.jobTitle;
    this.jobLevel;
    this.jobType;
    this.companyName;
    this.dateStarted;
    this.dateEnded;
    this.isCurrent;
    this.sector;
    this.location;
    this.duties;
    this.salary;
    this.disableSalary;
    this.reason;
};

function Qualification (){
    this.qualificationID;
    this.name;
    this.level;
    this.institution;
    this.yearCompleted;
    this.status; //complete,incomplete,in progress
    this.majors;
};

function Skill(){
    this.skillID
    this.description;
    this.level;
    this.experience;
    this.lastDate;
    this.isCurrent;
};

function JobSeeker (){
    this.jobSeekerID;
    this.firstName;
    this.middleName;
    this.lastName;
    this.gender;
    this.birthDate;
    this.registrationBody;
    this.registrationType;
    this.registrationNumber;
    this.id;
    this.nationality;
    this.hasWorkPermit;
    this.email;
    this.cell;
    this.homeTel;
    this.workTel;
    this.website;
    this.linkedInProfile;
    this.address;
    this.locationCountry;
    this.locationTown;
    this.minimumSalary;
    this.maximumSalary;
    this.disableSalary;
    this.photoID;
};

function Recruiter (){
    this.recruiterID;
    this.companyName;
    this.recruiterType;  //Employer,Agent
    this.companyAddress;
    this.companyTel;
    this.email;
    this.fax;
    this.locationCountry;
    this.locationTown;
    this.logoID;

};

function Application(){
    this.ApplicationID;
    this.JobAdID;
    this.RecruiterID;
    this.coverNote;
    this.characterLimit;
    this.ApplicationDate;

}