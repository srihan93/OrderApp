
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
errors.orderNotFound = "Order not found in your account";
errors.amountInsufficient = "In sufficient amount in your account";
errors.transactionFailed = "transaction failed for your order";
errors.orderUpdateFailed = "Error while updating order status/payment status";
errors.userCreation = "phone,firstName,lastName,email,password are mandatory";


module.exports = errors;