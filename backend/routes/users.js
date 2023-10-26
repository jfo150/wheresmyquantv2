const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');




// Load User model
const User = require('../models/User');

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    
    let errors = [];

    // check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // check pass match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if(errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        // Validation passed
        User.findOne({ email: email }).then(user => {
            if(user) {
                // User exists
                errors.push({ msg: 'Email is already registered' });
                res.status(400).json({ errors });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({ user: user });
                            })
                            .catch(err => console.log(err));
                }));
            }
        });
    }
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ user });
        });
    })(req, res, next);
});


// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});

router.get('/is-premium', (req, res) => {
    if (!req.user) {
        return res.status(401).send({ premium: false });
    }

    User.findById(req.user._id, (err, user) => {
        if (err) {
            return res.status(500).send({ error: 'Internal server error' });
        }

        return res.send({ premium: user.premium });  
    });
});

module.exports = router;

