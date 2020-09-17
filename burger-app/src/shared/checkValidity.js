


const checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules) 
        return true;
    if(rules.required) {
        if(typeof value === 'boolean')
            isValid = value;
        else
            isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    };

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    };

    if(rules.regexp) {
        isValid = rules.regexp.test(value) && isValid;
    };

    if(rules.datechck && isValid) {
        //Assumed date format: YYYY.MM.DD
        const date = value.split('.');
        if (date.length !== 3) 
            isValid = false;
        else {
            const d = [parseInt(date[0],10),parseInt(date[1],10),parseInt(date[2],10)];
            if(d[2] < 1) 
                isValid = false;
            else {
                const leapYear = (d[0]%4 === 0 && d[0]%100 !== 0) || (d[0]%400 === 0);
                if(/^01|03|05|07|08|10|12$/.test(date[1])) {
                    if(d[2] > 31) isValid = false;
                }else if(/^04|06|09|11$/.test(date[1])) {
                    if(d[2] > 30) isValid = false;
                }else if(/^02$/.test(date[1]) && leapYear) {
                    if(d[2] > 29) isValid = false;
                }else if(/^02$/.test(date[1]) && !leapYear) {
                    if(d[2] > 28) isValid = false;
                }else {
                    isValid = false;
                    console.error('Wrong date: ',value);
                };
            };
        }
    };

    if(rules.emptyIsTrue && !isValid) {
        if(value==='')
            isValid = true;
    }

    return isValid;
};

export default checkValidity;

