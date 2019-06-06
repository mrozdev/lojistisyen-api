exports.createPostValidator = (req, res, next) => {
    // title
    req.check('title', "Başlık alanını boş bırakmayın").notEmpty();
    req.check('title', 'Başlık en az 4 en fazla 150 karakterden oluşabilir').isLength({
        min: 4,
        max: 150
    });
    // body
    req.check('body', "İçerik alanını boş bırakmayın").notEmpty();
    req.check('body', 'İçerik en az 4 en fazla 5000 karakterden oluşabilir').isLength({
        min: 4,
        max: 5000
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
};


exports.createWallValidator = (req, res, next) => {
    // body
    req.check('body', "Durum alanını boş bırakmayın").notEmpty();
    req.check('body', 'En az 4, en fazla 280 karakter yazabilirsiniz').isLength({
        min: 4,
        max: 280
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "İsim alanını boş bırakmayın").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "E-posta 3 ila 32 karakter arasında olmalıdır")
        .matches(/.+\@.+\..+/)
        .withMessage("Geçerli e-posta adresi giriniz")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check("password", "Şifre alanını boş bırakmayın").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Şifre en az 6 karakter içermelidir")
        .matches(/\d/)
        .withMessage("Şifreniz en az bir sayı içermelidir");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};