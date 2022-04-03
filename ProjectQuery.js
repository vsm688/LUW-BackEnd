
async function ConstructQueryString(connection, queryArr) {
    let subscriptionArr = [];
    let activityArr = [];
    let yearLevelArr = [];
    let subjectMatterArr = [];
    let finalResults = [];
    let uniqueIds = [];
    let uniqueArr = [];

    for (let i = 0; i < queryArr.length; i++) {

        if (queryArr[i].checked === true) {
            if (queryArr[i].type == "subscription") {
                subscriptionArr.push(queryArr[i].name);
            }
            if (queryArr[i].type == "ActivityType") {
                activityArr.push(queryArr[i].name);
            }
            if(queryArr[i].type =="Year"){
                yearLevelArr.push(queryArr[i].name);
            }
        }
    }

    let queryStringSub = "SELECT * FROM Project";
    let queryStringActivity = "SELECT * FROM Project";
    let queryYearLevel = "SELECT * FROM Project";

    for (let i = 0; i < subscriptionArr.length; i++) {
        if (i == 0) {
            queryStringSub += ` WHERE Subscription = '${subscriptionArr[i]}'`
        } else {
            queryStringSub += ` OR Subscription = '${subscriptionArr[i]}'`
        }
    }

    for (let i = 0; i < activityArr.length; i++) {
        if (i == 0) {
            queryStringActivity += ` WHERE ActivityType = '${activityArr[i]}'`
        } else {
            queryStringActivity += ` OR ActivityType = '${activityArr[i]}'`
        }
    }


    
    // for (let i = 0; i < yearLevelArr.length; i++) {
    //     if (i == 0) {
    //         queryStringActivity += ` WHERE Year = '${yearLevelArr[i]}'`
    //     } else {
    //         queryStringActivity += ` OR Year = '${yearLevelArr[i]}'`
    //     }
    // }






    if (subscriptionArr.length > 0) {
        const subResults = await queryProject(connection, queryStringSub);

        for (let i = 0; i < subResults.length; i++) {
            finalResults.push(subResults[i]);
        }
    }
    if (activityArr.length > 0) {
        const activityResults = await queryProject(connection, queryStringActivity);


        for (let i = 0; i < activityResults.length; i++) {
            finalResults.push(activityResults[i]);
        }
    }


    for (let i = 0; i < finalResults.length; i ++){
        if (uniqueIds.includes(finalResults[i].ProjectID)){

        } else{
            uniqueIds.push(finalResults[i].ProjectID);
            uniqueArr.push(finalResults[i]);
        }
    }
    console.log(uniqueArr);
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