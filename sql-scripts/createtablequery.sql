CREATE TABLE IF NOT EXISTS Student (
	StudentID int PRIMARY KEY auto_increment, 
	Name VARCHAR(200),
    Email VARCHAR (100),
    Password VARCHAR(100),
    School VARCHAR(200),
    TeacherID int,
    DateOfBirth Date,
    ContactNumber varchar(15)
);

CREATE TABLE IF NOT EXISTS HelpRequest (
	RequestID int PRIMARY KEY auto_increment,
    StudentID int,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    DateCreated datetime,
    Done boolean
);

CREATE TABLE IF NOT EXISTS Teacher (
	TeacherID int Primary KEY auto_increment,
    Name VARCHAR(200),
    EMAIL VARCHAR(100),
    Password VARCHAR(100),
    School VARCHAR(200),
    ProfilePic VARCHAR(200),
    DateOfBirth Date,
    ContactNumber varchar(15)
);

CREATE TABLE IF NOT EXISTS Project (
	ProjectID int PRIMARY KEY,
    Name VARCHAR(50),
    LearningObjective VARCHAR(200),
    ActivityType VARCHAR(20),
    Year int,
    Course VARCHAR(20),
    Subscription VARCHAR(20),
    Instructions longtext,
    Video VARCHAR(200),
    SubjectMatter1 VARCHAR(20),
    SubjectMatter2 VARCHAR(20),
    SubjectMatter3 VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ProgressHistory (
	StudentID int,
    ProjectID int,
    ProgressHistory int,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
	PRIMARY KEY (StudentID, ProjectID),
    DateStarted date,
    DateSubmitted date,
    DateCompleted date,
    Submission VARCHAR(200)
);

