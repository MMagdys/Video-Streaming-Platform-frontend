exports.timeDifference = function timeDifference(previous) {
	
    return new Promise ( (resolve, reject) => {
        
        const current = new Date().getTime()
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            resolve(Math.round(elapsed/1000) + ' seconds ago');   
        }

        else if (elapsed < msPerHour) {
            resolve(Math.round(elapsed/msPerMinute) + ' minutes ago');   
        }

        else if (elapsed < msPerDay ) {
            resolve(Math.round(elapsed/msPerHour ) + ' hours ago');   
        }

        else if (elapsed < msPerMonth) {
            resolve(' ' + Math.round(elapsed/msPerDay) + ' days ago');   
        }

        else if (elapsed < msPerYear) {
            resolve(' ' + Math.round(elapsed/msPerMonth) + ' months ago');   
        }

        else {
            resolve(' ' + Math.round(elapsed/msPerYear ) + ' years ago');   
        }
    })
}