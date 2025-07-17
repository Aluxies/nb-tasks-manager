// Handles validation error while creating or updating a task
function validationErrorHandler(err) {
    if (err.name === "ValidationError") {
        const fields = [];
        for (const field in err.errors) {
            fields.push(field);
        }
        let fullErrorMessage = "Validation error caught :\n\n";
        fullErrorMessage += fields.map(field => `${field} : ${err.errors[field].message}`).join('\n');
        console.log(fullErrorMessage);
    } else {
        console.log("Unhandled error caught while creating new task :", err)
    }
}

module.exports = {
    validationErrorHandler
}