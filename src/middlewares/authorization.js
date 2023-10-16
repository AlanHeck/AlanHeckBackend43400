import passport from "passport";

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(
            strategy,
            { session: false },
            function (err, user, info) {
                if (err) return next(err);

                if (!user)
                    return res
                        .status(401)
                        .send({ error: info.messages ? info.messages : info.toString() });

                req.user = user;
                next();
            }
        )(req, res, next);
    };
};

export const handlePolicies = (policies) => {
    return async (req, res, next) => {
        const role = req.user.role;

        if (!policies.includes(role.toUpperCase())) {
            return res.status(403).send({ status: "error", error: "not authorized" });
        }

        next();
    };
};