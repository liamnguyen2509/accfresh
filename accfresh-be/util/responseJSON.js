module.exports = {
    responseJSON: (type, message = null, data = null, err = null) => {
        if (type == "MD") {
            return {
                type: "MissingData",
                status: false,
                message: message || "Required data is missing.",
                data,
                err,
            };
        } else if (type == "PD") {
            return {
                type: "permission Denied",
                status: false,
                message: "You don't have access to complete this process right now.",
                data,
                err,
                logout: true,
            };
        } else if (type == "ID") {
            return {
                type: "InvalidData",
                status: false,
                message: "",
                data,
                err,
            };
        } else if (type == "S") {
            return {
                type: "Success",
                status: true,
                message: message || "Successful.",
                data,
                err,
            };
        } else {
            return {
                type: "SomethingWentWrong",
                status: false,
                message: message || "Something went wrong. Please try again or later.",
                data,
                err,
            };
        }
    },
  };
  