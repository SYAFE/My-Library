const fs = require('fs');

exports.dateSetup = async function() {
    var output = new Object();
    const date = new Date();
    output.today = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate();
    const book = JSON.stringify(output, null, 2);
    fs.writeFileSync("./cfg/today.json", book);

    return 1;
}