import { body, validationResult } from "express-validator";

function registrationRules() {
    return [
        body("name", "Enter full name").isString().notEmpty(),
        body("email", "Enter a valid email").notEmpty().isEmail(),
        body("password", "Password must contain atleast 6 characters").custom(
            (password, { req }) => {
                let pass = password.split("");
                const invalid = pass.some((char) => {
                    return !/^[a-zA-Z0-9!@#$%^&*)(+=._-]*$/.test(char);
                });
                if (invalid) {
                    throw new Error("Invalid character in password string");
                }
                return true;
            }
        ),
    ];
}
function loginRules() {
    return [
        body("email", "Enter a valid email").notEmpty(),
        body("password", "Enter a password").notEmpty(),
    ];
}
function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ erros: errors.array() });
}

export { errorMiddleware, registrationRules, loginRules };