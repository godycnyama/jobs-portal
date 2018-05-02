var jobsServiceModule = angular.module('jobsServiceModule', []);
jobsServiceModule.factory('JobsService',['$http',function($http){
    
    var jobTitle = '';
    var jobLocation = '';
    var jobsPerPage = 4;
    var totalJobs = 0;
    var currentPage = 1;
    var job = {};
    var jobs = []; //Private Variable
    var jobTitles = [ 'Able Seamen','Academic Dean','Academic Dean-Registrar','Academic Librarian','Accountant','Accountant, Certified Public','Accountant, Government','Accountant, Management',
  'Accountant, Public','Accountant, Tax','Account Executive','Account Executive (advertising agency)','Accounting Clerk (bookkeeper)','Acquisitions Librarian','Acquisitions Librarian (health sciences)',
  'Acrobats (circus performers)','Activated Sludge Operator (water & wastewater treatment)','Actor/Actresses','Actuary','Acupressurist (acupuncturist)','Acupuncturist','Acute Care Nurse','Addiction Counselor',
  'Addiction Psychiatrist','Addiction Treatment Administrator','Adjudications Officer','Adjunct Faculty (college & university faculty members)','Administrative Assistant','Administrative Assistant (secretary)',
  'Administrative Manager','Administrative Officer','Administrative Support Staff','Administrator, Database (information systems manager)','Administrator, Web','Admissions Director','Admitting Clerk','Admitting Director',
  'Admitting Interviewer','Admitting Manager','Admitting Supervisor','Adult Day-Care Coordinator','Advance Agent (theatrical production)','Advertising Agency Worker','Advertising and Promotions Manager','Advertising Sales Agent',
  'Aerial Artist (circus performer)','Aerial Photographer','Aerobics Instructors (health club fitness)','Aerodynamics Engineer (aerospace)','Aeronautical Drafter','Aeronautical Engineer','Aeronomer','Aerospace Engineer',
  'Aerospace Products and Parts Manufacturing Worker','Agency Manager (advertising)','Agents, Cargo and Freight (industrial traffic manager)','Agricultural Aircraft Pilot','Agricultural and Biological Engineer','Agricultural Chemist',
  'Agricultural Commodity Grader (consumer safety officer)','Agricultural Supply Sales Representative','Agronomists','Air-Conditioning and Heating Technician','Air-conditioning Repairer','Aircraft Inspector (technicia)','Aircraft Mechanic',
  'Aircraft Repair Technician','Aircraft Structure, Surfaces, Rigging, & Sys Assembler','Aircraft Technician','Air Force Personnel','Airframe Technician','Airline Dispatcher','Airline Flight Attendant','Airplane Pilot, Commercial','Airport Manager',
  'Airport Security Worker','Airport Tower Controller (air traffic)','Air Traffic Controllers','AI Specialist','Aligners, Barrel and Receiver','All-around Machinist','Allergist','Alumni Director','Analyst','Analyst, Computer Systems','Analyst, Credit',
  'Analyst, Data Communications','Analyst, Handwriting','Analyst, Job','Analyst, Management','Analyst, News','Analyst, Operations Research','Analyst, Radiation (health physicist)','Analyst, Research (marketing researcher)','Analyst, Stress (aerospace engineer)',
  'Analytical Chemist','Anatomic Pathologist','Anchor, News (radio & television news reporter)','Anesthesiologist Assistant','Anesthesiologist','Anesthetist, Nurse','Animal Attendant','Animal Behavior Counsellor','Animal Behaviorist','Animal Breeder','Animal Caretakers',
  'Animal Control Officer','Animal Ecologist','Animal Eviscerator (slaughtering & meat-packing production)','Animal Nutritionist','Animal Physiologist (zoologist)','Animal Presenter (circus performer)','Animal Scientist','Animal Shelter Attendant','Animal Sticker (slaughtering & meat-packing production)',
  'Animal Trainer','Animator','Annealer (bench jeweler)','Announcer','Answering Service Operator (receptionist)','Anthropologist','Antiques Dealer','Apiculturist (entomologist)','Apparel Industry Worker','Appliance Service Technician','Applications Adjudicator','Applications Engineer','Applications Programmer',
  'Applied Animal Behaviorists','Applied Mathematician','Applied Statistician','Appraiser','Apprenticeship Consultant (training & development specialist)','Aquaculture Farmer (fish farm)','Aquaculturist','Aquatic Biologist','Aquatic Botanist','Aquatic Ecologist (zoologist)','Arbitrator','Arborist','Archaeologist','Architect',
  'Architectural Drafter','Archivist','Arc Welder','Armed Forces Personnel','Armoured-Car Guard (security officer)','Army Personnel','Art and Design Worker (publishing)','Art Director','Artificial Insemination Technician','Artificial Intelligence Programmer','Artificial Intelligence Specialist','Artist','Arts Administrator','Arts and Cultural Planner',
  'Art Teacher','Art Therapist','Asbestos Abatement Worker (hazardous materials removal)','Assembler','Assembly Inspector','Assembly Machine Operator','Assemblymen','Assemblywomen','Assessor','Asset Manager','Assistant Account Executive (advertising agency)','Assistant Court Clerk','Assistant Dispatcher (airline)','Assistant Engineer','Assistant Fire Chief',
  'Assistant Gaffer','Assistant Lodging Manager','Assistant Manager','Assistant Principal','Assistant Professor','Assistant Restaurant Manager','Assistant Retail Buyer','Associate and Assistant Editor','Associate Director','Associate Professor','Associate Retail Buyer'
  ];
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function (_page) {
            return currentPage;
        },
        SetJobs: function (_jobs) {
            jobs = _jobs;
            return
        },
        GetJobs: function(){             
                return jobs;            
        },
        SetJob: function (_job) {
            return job = _job;
        },
        GetJob: function(){
            return job;
        },
        SetJobTitle: function (_jobTitle) {
            return jobTitle = _jobTitle;
        },
        GetJobTitle: function () {
            return jobTitle;
        },
        SetJobLocation: function (_jobLocation) {
            return jobLocation = _jobLocation;
        },
        GetJobLocation: function () {
            return jobLocation;
        },
        SetJobsPerPage: function (_jobsPerPage) {
            return jobsPerPage = _jobsPerPage;
        },
        GetJobsPerPage: function () {
            return jobsPerPage;
        },
        SetTotalJobs: function (_totalJobs) {
            return totalJobs = _totalJobs;
        },
        GetTotalJobs: function () {
            return totalJobs;
        },
        SetTitle: function (_title) {
            return title = _title;
        },
        GetTitle: function () {
            return title;
        },
        GetJobTitles: function () {
            return jobTitles;
        }

    }
}]);