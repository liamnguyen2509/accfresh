const validateEmail = async (email) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    return email.match(emailRegex);
}

module.exports = { validateEmail };