


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
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.regexp) {
        isValid = rules.regexp.test(value) && isValid;
    }

    return isValid;
};

export default checkValidity;
