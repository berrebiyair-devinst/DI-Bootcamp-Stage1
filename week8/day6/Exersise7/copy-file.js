const fs = require("fs");

fs.readFile("source.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {

        fs.writeFile("destination.txt", data, (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("File copied successfully!");
            }
        });

    }
});