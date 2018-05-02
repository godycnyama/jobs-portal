$timeout(countUp, 500);
/**
    $scope.save = function () {
        JobSeekerService.CreatePersonalDetails($scope.personal);
        $state.go('profile.master')
    };
    **/
/**
$scope.upDatePersonal = function (){
    var jobSeeker = JobSeekerService.GetJobSeeker();
    jobSeeker.firstName = $scope.personal.firstName;
    jobSeeker.middleName = $scope.personal.middleName;
    jobSeeker.lastName = $scope.personal.lastName;
    jobSeeker.gender = $scope.personal.gender;
    jobSeeker.birthDate = $scope.personal.birthDate;
    jobSeeker.nationality = $scope.personal.nationality;
    jobSeeker.mainQualification = $scope.personal.mainQualification;
    jobSeeker.careerObjectives = $scope.personal.careerObjectives;
    jobSeeker.homeTel = $scope.personal.homeTel;
    jobSeeker.workTel = $scope.personal.workTel;
    jobSeeker.mobile = $scope.personal.mobile;
    jobSeeker.email = $scope.personal.email;
    jobSeeker.address = $scope.personal.address;
    jobSeeker.locationTown = $scope.personal.locationTown;
    jobSeeker.locationCountry = $scope.personal.locationCountry;
    jobSeeker.linkedInProfile = $scope.personal.linkedInProfile;
    jobSeeker.website = $scope.personal.website;
    jobSeeker.professionalAffiliations = $scope.personal.professionalAffiliations;
    jobSeeker.noticePeriod = $scope.personal.noticePeriod;
    jobSeeker.requiredSalaryCurrency = $scope.personal.requiredSalaryCurrency;
    jobSeeker.requiredMinimumSalary = $scope.personal.requiredMinimumSalary;
    jobSeeker.requiredMaximumSalary = $scope.personal.requiredMaximumSalary;
    jobSeeker.preferredJobTitles = $scope.preferredJobTitles;
    jobSeeker.preferredJobTypes = $scope.preferredJobTypes;
    jobSeeker.preferredJobLocations = $scope.preferredJobLocations;
    jobSeeker.photo = $scope.personal.photo;
    jobSeeker.put().then(function () {
        $scope.message = 'Personal details updated successfully!';
    }, function () {
        $scope.message = 'An error occured while updating personal details,try again!'
    })

};
**/

$scope.createEducation = function () {
    var education = Restangular.one(jobSeekers, email).all(education);
    education.post($scope.education).then(function () {
        $scope.message = 'Education record successfully added!';
    }, function () {
        $scope.message = 'An error occured while creating education record!';
    })
};
$scope.upDateEducation = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var education = jobSeeker.education[index];
    education.title = $scope.education.title;
    education.level = $scope.education.level;
    education.institution = $scope.education.institution;
    education.locationTown = $scope.education.locationTown;
    education.locationCountry = $scope.education.locationCountry;
    education.startMonth = $scope.education.startMonth;
    education.startYear = $scope.education.startYear;
    education.endMonth = $scope.education.endMonth;
    education.endYear = $scope.education.endYear;
    education.status = $scope.education.status;
    education.majors = $scope.education.majors;
    education.put().then(function () {
        $scope.message = 'Education record successfully updated!';
    }, function () {
        $scope.message = 'An error occured while creating education record!';
    })
};
$scope.deleteEducation = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var education = jobSeeker.education[index];
    education.remove().then(function () {
        $scope.message = null;
    }, function () {
        $scope.message = 'An error occured while deleting education record!';
    })
}


$scope.createEmployment = function () {
    var employment = Restangular.one(jobSeekers, email).all(employment);
    employment.post($scope.employment).then(function () {
        $scope.message = 'Employment record successfully added!';
    }, function () {
        $scope.message = 'Error occured while creating employment record!';
    })
};
$scope.upDateEmployment = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var employment = jobSeeker.employment[index];
    employment.jobTitle = $scope.employment.jobTitle;
    employment.jobLevel = $scope.employment.jobLevel;
    employment.jobType = $scope.employment.jobType;
    employment.companyName = $scope.employment.companyName;
    employment.companySector = $scope.employment.companySector;
    employment.locationTown = $scope.employment.locationTown;
    employment.locationCountry = $scope.employment.locationCountry;
    employment.startMonth = $scope.employment.startMonth;
    employment.startYear = $scope.employment.startYear;
    employment.endMonth = $scope.employment.endMonth;
    employment.endYear = $scope.employment.endYear;
    employment.duties = $scope.employment.duties;
    employment.isCurrent = $scope.employment.isCurrent;
    employment.salaryCurrency = $scope.employment.salaryCurrency;
    employment.salary = $scope.employment.salary;
    employment.disableSalary = $scope.employment.disableSalary;
    employment.reasonsForLeaving = $scope.employment.reasonsForLeaving;
    employment.put().then(function () {
        $scope.message = null;
    }, function () {
        $scope.message = 'An error occured while updating employment record!';
    })
};
$scope.deleteEmployment = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var employment = jobSeeker.employment[index];
    employment.remove().then(function () {
        $scope.message = null;
    }, function () {
        $scope.message = 'An error occured while deleting employment record!';
    })
};

$scope.createSkill = function () {
    var skill = Restangular.one(jobSeekers, email).all(skills);
    skill.post($scope.skill).then(function () {
        $scope.message = 'Skill record successfully added!';
    }, function () {
        $scope.message = 'An error occured while creating skill record!';
    })
};
$scope.upDateSkill = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var skill = jobSeeker.skills[index];
    skill.description = $scope.skill.description;
    skill.skillLevel = $scope.skill.skillLevel;
    skill.experience = $scope.skill.experience;
    skill.lastDateUsed = $scope.skill.lastDateUsed;
    skill.isCurrent = $scope.skill.isCurrent;
    skill.put().then(function () {
        $scope.message = null;
    }, function () {
        $scope.message = 'An error occured while updating skill record!';
    })
};
$scope.deleteSkill = function () {
    var jobSeeker = JobSeekerService.GetJobSeeker(jobSeeker);
    var skill = jobSeeker.skills[index];
    skill.remove().then(function () {
        $scope.message = null;
    }, function () {
        $scope.message = 'An error occured while deleting skill record!';
    })
}