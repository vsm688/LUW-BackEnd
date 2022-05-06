
async function ConstructQueryString(connection, queryArr) {

    // Arrays for storing information form the constructed query strings
    let subscriptionArr = [];
    let activityArr = [];
    let yearLevelArr = [];
    let subjectMatterArr = [];
    let finalResults = [];
    let uniqueIds = [];
    let uniqueArr = [];


    // loops through the queryArray, checks which of the checkboxes are checked and what type they are.
    for (let i = 0; i < queryArr.length; i++) {

        if (queryArr[i].checked === true) {
            if (queryArr[i].type == "subscription") {
                subscriptionArr.push(queryArr[i].name);
            }
            if (queryArr[i].type == "ActivityType") {
                activityArr.push(queryArr[i].name);
            }
            if(queryArr[i].type =="Year"){
                yearLevelArr.push({lower:queryArr[i].lower, upper:queryArr[i].higher});
            }
            if (queryArr[i].type == "Subject") {
                subjectMatterArr.push(queryArr[i].name);
            }
        }
    }

  
    // Default query string constructors 
    let queryStringSub = "SELECT * FROM Project";
    let queryStringActivity = "SELECT * FROM Project";
    let queryStringYearLevel = "SELECT * FROM Project";
    let queryStringSubject = "SELECT * FROM Project";


    // Loops through all subscription checkboxes, and adds their name onto the query string.
    for (let i = 0; i < subscriptionArr.length; i++) {
        if (i == 0) {
            // first condition add where clause
            queryStringSub += ` WHERE Subscription = '${subscriptionArr[i]}'`
        } else {
            // following add OR 
            queryStringSub += ` OR Subscription = '${subscriptionArr[i]}'`
        }
    }
     // Loops through all activity checkboxes, and adds their name onto the query string.

    for (let i = 0; i < activityArr.length; i++) {
        if (i == 0) {
            queryStringActivity += ` WHERE ActivityType = '${activityArr[i]}'`
        } else {
            queryStringActivity += ` OR ActivityType = '${activityArr[i]}'`
        }
    }

    for (let i = 0; i < yearLevelArr.length; i++) {
        if (i == 0) {
            queryStringYearLevel += ` WHERE Year >= ${yearLevelArr[i].lower} AND Year <= ${yearLevelArr[i].upper} `
        } else {
            queryStringYearLevel += ` OR Year >= ${yearLevelArr[i].lower} AND Year <= ${yearLevelArr[i].upper}`
        }
    }
    
    for (let i = 0; i < subjectMatterArr.length; i++) {
        if (i == 0) {
            queryStringSubject += ` WHERE SubjectMatter1 = '${subjectMatterArr[i]}'`
        } else {
            queryStringSubject += ` OR SubjectMatter1 = '${subjectMatterArr[i]}'`
        }
    }
  




    // checks if anything is actually contained in the subscription array. i.e has at least one checkbox being checked? 
    // If there is then we can query the project via the query stirng and push all results to a final results array.
    if (subscriptionArr.length > 0) {
        const subResults = await queryProject(connection, queryStringSub);

        for (let i = 0; i < subResults.length; i++) {
            finalResults.push(subResults[i]);
        }
    }
    // checks if anything is actually contained in the activity array. i.e has at least one checkbox being checked? 
    // If there is then we can query the project via the query stirng and push all results to a final results array.
    if (activityArr.length > 0) {
        const activityResults = await queryProject(connection, queryStringActivity);


        for (let i = 0; i < activityResults.length; i++) {
            finalResults.push(activityResults[i]);
        }
    }


    if (yearLevelArr.length > 0) {
        const yearResults = await queryProject(connection, queryStringYearLevel);


        for (let i = 0; i < yearResults.length; i++) {
            finalResults.push(yearResults[i]);
        }
    }
    
    if (subjectMatterArr.length > 0) {
        const subjectResults = await queryProject(connection, queryStringSubject);


        for (let i = 0; i < subjectResults.length; i++) {
            finalResults.push(subjectResults[i]);
        }
    }





    // Could use a set for this, but I decided to use an array to make life easier.
    // We could get the same project from the above loops (i.e a project can be free AND it can be Animation)
    // This results in duplicates, therefore we want to filter those duplicates and only return unique projects.
    for (let i = 0; i < finalResults.length; i ++){
        if (uniqueIds.includes(finalResults[i].ProjectID)){
            
        } else{
            uniqueIds.push(finalResults[i].ProjectID);
            uniqueArr.push(finalResults[i]);
        }
    }
   

    // returns the array of unique projects.
    return uniqueArr;








};



async function queryProject(connection, queryString) {
    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, result) => {
            if (err) {
                console.log("query doesnt work")
                return reject(err)
            }
            else {
                return resolve(result);
            }
        });
    })
};

module.exports = {
    ConstructQueryString
}