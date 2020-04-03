exports.prettifyStats = stats => {
    const prettyStats = {};
    Object.entries(stats).forEach(pair => {
        const newName = pair[0]
            .replace(/_/g, ' ');
        let newValue;
        if(pair[0] !== 'Last_Updated' && pair[0] !== 'id') {
            newValue = pair[1]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            newValue = pair[1].toString();
        }
        prettyStats[newName] = newValue;
    });
    return prettyStats;
}

exports.checkForCsv = (req, res, next) => {
    'csv' in req.query ? req.csv = true : req.csv = false;
    next()
}