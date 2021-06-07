
var errors ={}


errors.userExists = "User already exists";
errors.authorizationFailed = "Token is not valid";
errors.passwordNotValid ="Username or Password is invalid";
errors.commonError = "Unknown error occurred";
errors.notFound ="Resource not found";
errors.methodNotAllowed = "Method not allowed";
errors.paymentFailed = "Payment Failed";
errors.orderCreationFailed ="Order not placed";
errors.cartEmpty ="Cart is empty";


module.exports = errors;