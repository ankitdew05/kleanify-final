//pk_ce701a610f1446f71352a68245c1c92ef6
//VqYDmT

const express = require("express");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const { Profile } = require("./models/profile");
const { default: axios } = require("axios");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const session = require("express-session");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const nodemailer = require("nodemailer");
const { Email } = require("./models/email");
const { Shedular } = require("./models/shedular");
const { URLSearchParams } = require("url");
const encodedParams = new URLSearchParams();
const sgMail = require("@sendgrid/mail");
const schedule = require("node-schedule");
const { Credit } = require("./models/credit");
const Jwt = require("jsonwebtoken");
const jwtKey = "klaviyo";
const { PasswordReset } = require("./models/PasswordReset");
const { randomUUID } = require("crypto");
const path = require('path')
const {
  Project_dashboard_widget,
} = require("./models/project_dashboard_widgets");
const {
  Project_dashboard_project,
} = require("./models/project_dashboard_projects");
const stripe = require("stripe")(process.env.STRIPE_PUBLISHIABLE_KEY);
const uuid = require("uuid").v4;
const SERVER_ROOT_URI = "https://klaviyo-backend.herokuapp.com";
app.use(express.json());
app.use(cors());
const redirectURI = "auth/google";
const passport = require("passport");
const { Plan } = require("./models/plans");
const { PaidUser } = require("./models/paiduser");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new facebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: "1788079844728842",
      clientSecret: "8e1adfc1aac53bc894ff4824e87f5078",
      callbackURL: "https://klaviyo-backend.herokuapp.com/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "picture.type(large)",
        "email",
      ],
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function () {
        // find the user in the database based on their facebook id
        User.findOne({ uid: profile.id }, function (err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) return done(err);

          // if the user is found, then log them in
          if (user) {
            console.log("user found");
            console.log(user);
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.googleId = profile.id; // set the users facebook id
            newUser.token = token; // we will save the token that facebook provides to the user
            newUser.name =
              profile.name.givenName + " " + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
            // save our user to the database
            newUser.save(function (err) {
              if (err) throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email,user_photos" })
);
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "https://klaviyo-frontend.herokuapp.com/failure",
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "914975534512-vg9vp9o96b9si9ibti6nhhc5p7vb2v2g.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://klaviyo-backend.herokuapp.com/auth/google/callback",
      scope: ["profile", "email"],
    },

    async function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

app.get('/home',isLoggedIn, function(req, res) {
  res.redirect( 301, 'https://klaviyo-frontend.herokuapp.com/home')
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('https://klaviyo-frontend.herokuapp.com/home');
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://klaviyo-frontend.herokuapp.com/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(301, "https://klaviyo-frontend.herokuapp.com/home");
  }
);

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: process.env.CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(""),
  };

  return `${rootUrl}?${URLSearchParams.stringify(options)}`;
}

app.get("/auth/google/url", (req, res) => {
  return res.send(getGoogleAuthURL());
});

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

app.post("/payment", async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  try {
    await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      receipt_email: token.email,
      description: `purchase of product.name`,
    });
  } catch (error) {
    console.log(error);
  }
  res.json({ error });
  /*return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price*100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of product.name`,
      });
    })
    .then(result => res.status(200).json(result))
    .catch(err=> console.log(err))*/
});

app.post("/create-checkout-session", async (req, res) => {
  const planId = req.body.planId;
  console.log(planId);
  const period = req.body.period;
  const id = req.body.id;
  console.log(id);

  let result = await fetch(`https://klaviyo-backend.herokuapp.com/plan/${planId}`);
  result = await result.json();
  const product = await stripe.products.create({
    name: `${result[0].title}`,
  });
  const productId = product.id;
  console.log(productId);

  if (period === "year") {
    amount = result[0].yearlyPricing * 100;
  } else {
    amount = result[0].monthlyPrice * 100;
  }

  console.log(amount);

  const price = await stripe.prices.create({
    unit_amount: `${amount}`,
    currency: "usd",
    recurring: { interval: "month" },
    product: `${productId}`,
  });
  const priceId = price.id;
  console.log(priceId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: `${priceId}`,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    success_url: `https://klaviyo-backend.herokuapp.com/success/${planId}/${id}/${period}`,
    cancel_url: `https://klaviyo-frontend.herokuapp.com/failure`,
  });
  res.send(session);
  console.log(session);
});

app.get("/success/:planId/:id/:period", async (req, resp) => {
  const planId = req.params.planId;
  const period = req.params.period;
  const paiduser = await PaidUser.findByIdAndUpdate(req.params.id, {
    planId: planId,
    paidStatus: true,
    period: period,
  });
  if (!paiduser) return resp.status(400).send("No Such User Found");

  resp.redirect(301, "https://klaviyo-frontend.herokuapp.com/success");
});

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/paidregister", async (req, resp) => {
  let user = new PaidUser(req.body);
  let result = await user.save();
  result = result.toObject();
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "something went wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});

//Password reset stuff
app.post("/requestPasswordReset", (req, res) => {
  const { email } = req.body;
  User.find({ email })
    .then((data) => {
      if (data.length) {
        const secret = jwtKey + data[0].password;
        const payload = {
          email: data[0].email,
          id: data[0]._id,
        };
        const token = Jwt.sign(payload, secret, { expiresIn: "15m" });
        const link = `https://klaviyo-frontend.herokuapp.com/reset-password/${data[0]._id}/${token}`;
        console.log(link);
        const msg = {
          from: "ankitdewangan2002@gmail.com",
          to: email,
          subject: "Reset Pasword",
          html: `<p>Link to reset password</p>,${link}`,
        };
        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "ankitdewangan2002@gmail.com",
              pass: "yfzrknhvksmfiapl",
            },
            port: 465,
            host: "smtp.gmail.com",
          })
          .sendMail(msg, (err) => {
            if (err) {
              return console.log("Error Occurs", err);
            } else {
              return console.log("Email sent");
            }
          });
        res.send("password reset link has been sent to your email");
      } else {
        res.json({
          status: "FAILED",
          message: "No account with the suplied email exists",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "An error occured while checking for existing user",
      });
    });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/reset-password/:_id/:token", (req, res, next) => {
  const { _id, token } = req.params;
  User.find({ _id })
    .then((data) => {
      const secret = jwtKey + data[0].password;
      try {
        const payload = Jwt.verify(token, secret);
        res.send(data[0]._id);
      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
    })
    .catch((error) => {
      res.send("Not a valid id");
      console.log("no such User Exixts", error);
    });
});

app.post("/reset-password/:_id/:token", (req, res, next) => {
  const { _id, token } = req.params;
  const { password, password2 } = req.body;
  User.find({ _id })
    .then((data) => {
      const secret = jwtKey + data[0].password;
      try {
        const payload = Jwt.verify(token, secret);
        if (password === password2) {
          (data[0].password = req.body.password), res.send(payload);
        } else {
          res.send("Both password doesnot match");
        }
      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
    })
    .catch((error) => {
      console.log("no such User Exixts", error);
      res.send("Not a valid id");
    });
});

app.put("/reset-password/:id/:token", async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) return res.status(500).send("the User cannot be updated!");
  res.send(user);
});

const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
  const resetString = randomUUID + _id;
  PasswordReset.deleteMany({ userId: _id })
    .then((result) => {
      const msg = {
        from: "ankitdewangan2002@gmail.com",
        to: "ankitdewangan2002@gmail.com",
        subject: "Password Reset",
        html: `<p>password reset dont worry</p>,
      <p>This is link</p>,<a href=${
        redirectUrl + "/" + _id + "/" + resetString
      }></a>`,
      };

      nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: "ankitdewangan2002@gmail.com",
            pass: "yfzrknhvksmfiapl",
          },
          port: 465,
          host: "smtp.gmail.com",
        })

        .sendMail(msg, (err) => {
          if (err) {
            return console.log("Error Occurs", err);
          } else {
            return console.log("Email sent");
          }
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Clearning Failed",
      });
    });
};

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "please add token with header" });
  }
}

app.get("/all/:key", async (req, res) => {
  let key = req.params.key;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metrics?page=0&count=5000&api_key=${key}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.get("/bounce/:key/:pk", async (req, res) => {
  let key = req.params.key;
  let pk = req.params.pk;

  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

var arrayr = [];
var date = (Date.now() / 1000) | 0;
var newDate = date - 3600 * 2;
app.get("/receive/:key/:pk", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;
  var next;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${newDate}&count=100&sort=asc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      console.log(response.data.data[0]);
      var arr = response.data.data;
      arr.forEach((element) => {
        arrayr.push(element.person.email);
      });
      next = response.data.next;
      finalr(key, pk, next, arrayr).then((resp) => {
        console.log(resp.length);
        res.send(arrayr);
        console.log(arrayr);
      });
    })
    .catch((error) => {
      res.send(error.message);
    });
});

async function finalr(key, pk, next, arrayr) {
  const length = await fianlCallr(key, pk, next, arrayr);
  return arrayr;
}

async function fianlCallr(key, pk, next, arrayr) {
  if (next != null) {
    var next1 = await getReceive(key, pk, next, arrayr);
    if (next1 != null) {
      await fianlCallr(key, pk, next1, arrayr);
    }
  } else {
    console.log(arrayr.length);
    console.log("No Next");
  }
  return arrayr.length;
}

async function getReceive(key, pk, next, arrayr) {
  const data = await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${next}&count=5000&sort=asc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      var arr = response.data.data;
      arr.forEach((element) => {
        arrayr.push(element.person.email);
      });
      console.log(response.data.next);
      return response.data.next;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return data;
}

app.get("/clicked/:key/:pk", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;

  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/opened/:key/:pk", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});
var array = [];
var date = (Date.now() / 1000) | 0;
var newDate = date - 3600 * 24;
app.get("/newsub/:key/:pk", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;
  var next;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${newDate}&count=100&sort=asc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      var arr = response.data.data;
      arr.forEach((element) => {
        array.push(element.person.email);
      });
      next = response.data.next;

      final(key, pk, next, array).then((resp) => {
        console.log(resp.length);
        res.send(array);
      });
    })
    .catch((error) => {
      res.send(error.message);
    });
});

async function final(key, pk, next, array) {
  const length = await fianlCall(key, pk, next, array);
  return array;
}

async function fianlCall(key, pk, next, array) {
  if (next != null) {
    var next1 = await getSub(key, pk, next, array);
    if (next1 != null) {
      await fianlCall(key, pk, next1, array);
    }
  } else {
    console.log(array.length);
    console.log("No Next");
  }
  return array.length;
}

async function getSub(key, pk, next, array) {
  const data = await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${next}&count=5000&sort=asc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      var arr = response.data.data;
      arr.forEach((element) => {
        array.push(element.person.email);
      });
      return response.data.next;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return data;
}

//-----------------------

app.get("/newsubm/:key/:pk/:next", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;
  let next = req.params.next;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${next}&count=5000&sort=asc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/checkemail/:email", async (req, res) => {
  let email = req.params.email;
  await axios
    .get(
      `https://apps.emaillistverify.com/api/verifyEmail?secret=hR94SNue91h5TZrji74Ir&email=${email}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/receivem/:key/:pk/:next", async (req, res) => {
  let pk = req.params.pk;
  let key = req.params.key;
  let next = req.params.next;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/metric/${key}/timeline?since=${next}&count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/rperson/:id/:pk/:matric", async (req, res) => {
  let matric = req.params.matric;
  let pk = req.params.pk;
  let id = req.params.id;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/person/${id}/metric/${matric}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      // console.log(response.data.count);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/cperson/:id/:pk/:matric", async (req, res) => {
  let matric = req.params.matric;
  let pk = req.params.pk;
  let id = req.params.id;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/person/${id}/metric/${matric}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/operson/:id/:pk/:matric", async (req, res) => {
  let matric = req.params.matric;
  let id = req.params.id;
  let pk = req.params.pk;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/person/${id}/metric/${matric}/timeline?count=5000&sort=desc&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/bounced/:pk", async (req, res) => {
  let pk = req.params.pk;
  await axios
    .get(
      `https://a.klaviyo.com/api/v1/people/exclusions?reason=bounced&sort=desc&count=5000&page=0&api_key=${pk}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

/*const url =
  "https://a.klaviyo.com/api/v1/people/exclusions?reason=bounced&sort=desc&count=5000&page=0&api_key=pk_f188367b3073ecdeac27491f20baf27323";
const options = { method: "GET", headers: { Accept: "application/json" } };

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    console.log(json.total);
    d = json.data[0].timestamp;
    arr = json.data
    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 30);
   var  count = 0
    arr.forEach(element => {
      if(new Date(myPastDate) < new Date(element.timestamp)){
        count = count + 1
      }
    });
    console.log(count)
  })
  .catch((err) => console.error("error:" + err));*/

app.post("/user", async (req, resp) => {
  //console.log(req.body);
  let user = await new User({
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    apiKey: req.body.apiKey,
  });
  let result = await user.save();
  // console.log(result._id);
  resp.send(result._id);
});
app.post("/paiduser", async (req, resp) => {
  //console.log(req.body);
  let paiduser = await new PaidUser({
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    apiKey: req.body.apiKey,
    planId: req.body.planId,
  });
  let result = await paiduser.save();
  // console.log(result._id);
  resp.send(result._id);
});

app.get("/paiduser", async (req, resp) => {
  const result = await PaidUser.find().populate("planId");
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No result Found" });
  }
});

app.post("/plan", async (req, resp) => {
  //console.log(req.body);
  let plan = await new Plan({
    title: req.body.title,
    subtitle: req.body.subtitle,
    subscriber: req.body.subscriber,
    yearlyPricing: req.body.yearlyPricing,
    monthlyPrice: req.body.monthlyPrice,
    features: req.body.features,
  });
  let result = await plan.save();
  // console.log(result._id);
  resp.send(result._id);
});

app.get("/plan", async (req, resp) => {
  const result = await Plan.find();
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No result Found" });
  }
});

app.get("/plan/:id", async (req, resp) => {
  const result = await Plan.find({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No result Found" });
  }
});

app.put("/user/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    apiKey: req.body.apiKey,
    credit: req.body.credit,
    status: req.body.status,
  });
  if (!user) return res.status(400).send("No Such User Found");

  return res.status(400).send("Credit Updated");
});

app.post("/credit", async (req, resp) => {
  //console.log(req.body);
  let user = await new Credit({
    credit: req.body.credit,
  });
  let result = await user.save();
  // console.log(result._id);
  resp.send(result._id);
});

app.put("/credit", async (req, res) => {
  const credit = await Credit.findByIdAndUpdate("62bc4e648983552be5679a0e", {
    credit: req.body.ccredit,
  });
  if (!credit) return res.status(400).send("No Such Credit Found");
  return res.status(400).send("Credit Updated");
});

app.post("/profile", async (req, resp) => {
  let comment = new Profile({
    array: req.body.array,
    user: req.body.user,
    key: req.body.key,
  });
  let result = await comment.save();
  resp.send(result);
});

app.post("/email", async (req, resp) => {
  let comment = new Email({
    array: req.body.emailArr,
    apiKey: req.body.apiKey,
    creditUsed: req.body.creditUsed,
  });
  let result = await comment.save();
  resp.send(result);
});

app.get("/email/:apiKey", async (req, resp) => {
  const result = await Email.find({ apiKey: req.params.apiKey });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No result Found" });
  }
});

app.get(`/profile`, async (req, res) => {
  const profileList = await Profile.find().populate("user");
  if (!profileList) {
    res.status(500).json({ success: false });
  }
  res.send(profileList);
});

app.get(`/project_dashboard_widgets`, async (req, res) => {
  const profileList = await Project_dashboard_widget.find();
  if (!profileList) {
    res.status(500).json({ success: false });
  }
  res.send(profileList);
});

app.get(`/project_dashboard_projects`, async (req, res) => {
  const profileList = await Project_dashboard_project.find();
  if (!profileList) {
    res.status(500).json({ success: false });
  }
  res.send(profileList);
});

app.get(`/credit`, async (req, res) => {
  const credit = await Credit.find();
  if (!credit) {
    res.status(500).json({ success: false });
  }
  res.send(credit);
});

app.get(`/user`, async (req, res) => {
  const userList = await User.find();
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//https://a.klaviyo.com/api/v1/metrics/timeline?api_key=pk_ce701a610f1446f71352a68245c1c92ef6
//https://a.klaviyo.com/api/v1/metric/METRIC_ID/timeline?
//https://a.klaviyo.com/api/v1/metric/ShTqgL/export?
//https://a.klaviyo.com/api/v1/metric/SQhcxZ/timeline?count=50&sort=desc&

/*const postProfile =(array)=>{
      array.map((value) => {
        console.log(value),
          fetch("http://localhost:5000/profile", {
            method: "POST",
            body: JSON.stringify(value),
            headers: { "Content-Type": "application/json" },
          });
      })
    .catch((err) => console.error("error:" + err));
  
    }*/
/*const url =
  "https://a.klaviyo.com/api/v1/metrics/timeline?api_key=pk_ce701a610f1446f71352a68245c1c92ef6";
const options = { method: "GET", headers: { Accept: "application/json" } };

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
    arr = data.data;
    arr.map((value) => {
      if (value.event_name == "Bounced Email") {
        var metrics_id = value.statistic_id;
        console.log(metrics_id);
      }
    });
  })
  .catch((err) => console.error("error:" + err));*/

//dJNY1Slm10H1MYD7jVqRI

mongoose
  .connect(
    "mongodb+srv://react_native_ecommerce:MkUupihs44kGaNo9@cluster0.dvkiq.mongodb.net/Klaviyo-database?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Their is an Erron", err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Running on port 5000");
});
//pk_4ebe31991a37b58d4cb100f5e1d128c94a
//pk_f188367b3073ecdeac27491f20baf27323

app.get(`/check`, async (req, res) => {
  var array = [];
  await axios
    .get("http://localhost:5000/user")
    .then((response) => {
      var arr = response.data;
      arr.forEach((element) => {
        if (element.credit > 0) {
          array.push(element.apiKey);
        }
      });
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return array;
});

async function getCheckedEmail() {
  const email = await checkEmail();
  return email;
}

async function checkEmail() {
  var array = [];
  await axios
    .get("http://localhost:5000/user")
    .then((response) => {
      var arr = response.data;
      arr.forEach((element) => {
        if (element) {
          array.push(element);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return array;
}

async function checkCredit() {
  const companyCredit = await axios
    .get("http://localhost:5000/credit")
    .then((response) => {
      return response.data[0].credit;
    })
    .catch((err) => {
      console.log(err);
    });
  return companyCredit;
}

app.get("/shedule/:state", (req, res) => {
  let state = req.params.state;
  const task = cron.schedule(
    "*/30 * * * * *",
    () => {
      checkCredit().then((response) => {
        var companyCredit = "";
        if (response >= 0) {
          companyCredit = response;
          getCheckedEmail().then((response) => {
            response.forEach((element) => {
              if (element.credit > 0) {
                console.log(`Cron Sheduler is Started For ${element.apiKey}`);
                var date = (Date.now() / 1000) | 0;
                var newDate = date - 3600 * 24;
                const url = `https://a.klaviyo.com/api/v1/metric/L4QfnB/timeline?since=${newDate}&count=100&sort=asc&api_key=${element.apiKey}`;
                const options = {
                  method: "GET",
                  headers: { Accept: "application/json" },
                };
                fetch(url, options)
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.status == 404) {
                      console.log("No new Subscriber");
                    } else {
                      array = [];
                      var arr1 = json.data;
                      arr1.forEach((element) => {
                        array.push(element.person.email);
                      });
                      const creditUsed = array.length;
                      var credit = element.credit;
                      var credit = credit - array.length;
                      if (credit <= 0) {
                        console.log("Not enough credit to execute this");
                      } else {
                        var status = element.status;
                        var status = true;
                        fetch(`http://localhost:5000/user/${element._id}`, {
                          method: "Put",
                          body: JSON.stringify({ credit, status }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                        var ccredit = companyCredit - array.length;
                        console.log(ccredit);
                        if (ccredit < 0) {
                          console.log(
                            "Not enough Comapny Credit To Execute This"
                          );
                        } else {
                          fetch(`http://localhost:5000/credit`, {
                            method: "Put",
                            body: JSON.stringify({ ccredit }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          });
                          emailSerilizer(array, element.apiKey, creditUsed);
                        }
                      }
                    }
                  })
                  .catch((err) => console.error("error:" + err));
              } else {
                console.log("Credit Khatam");
                var status = element.status;
                var status = false;
                fetch(`http://localhost:5000/user/${element._id}`, {
                  method: "Put",
                  body: JSON.stringify({ status }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              }
            });
          });
        } else {
          console.log("Company credit is over");
        }
      });
    },
    {
      scheduled: false,
    }
  );

  async function getEmail(element, apiKey) {
    const email = await axios
      .get(
        `https://apps.emaillistverify.com/api/verifyEmail?secret=hR94SNue91h5TZrji74Ir&email=${element}`,
        {}
      )
      .then((response) => {
        if (
          response.data === "ok" ||
          response.data === "ok_for_all" ||
          response.data === "error_credit"
        ) {
          if (response.data === "error_credit") {
            console.log("Klaviyo Credit Is Over");
            over = "Klaviyo Credit Is Over";
            return over;
          } else {
            console.log("Email Is Good To Send");
          }
        } else {
          console.log("Email Is Not Good To Sent We Will Supress it Soon");
          encodedParams.set("email", `${element}`);
          fetch(
            `https://a.klaviyo.com/api/v1/people/exclusions?api_key=${apiKey}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: encodedParams,
            }
          )
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              return element;
            })
            .catch((err) => console.error("error:" + err));
        }
      })
      .catch((error) => {
        console.log("here", error);
      });
    return email;
  }

  async function emailSerilizer(array, apiKey, creditUsed) {
    let emailArr = [];
    for (let i = 0; i < array.length; i++) {
      try {
        const email = await getEmail(array[i], apiKey);
        if (email === "Klaviyo Credit Is Over") {
          console.log("Over");
        } else {
          emailArr.push(email);
        }
      } catch (error) {
        console.log("hi", error);
      }
    }
    if (emailArr[0] != null) {
      fetch("http://localhost:5000/email", {
        method: "POST",
        body: JSON.stringify({ emailArr, apiKey, creditUsed }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("email Posted");
    } else {
      console.log("No Bad Subscriber in the Last One Hour");
    }
  }

  if (state == "true") {
    task.start();
    console.log("running");
    res.send("running");
  } else {
    task.stop();
    console.log("Stopped");
    res.send("stopped");
  }
});

/* fetch(`http://localhost:5000/newsub/L4QfnB/${apiKey}`, {
      method: "GET",
      mdoe: "no-cors",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://localhost:3000",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        array = []
        array = response
        console.log(array);
        const creditUsed = array.length;
          emailSerilizer(array, apiKey, creditUsed);
      })
      .catch((err) => console.error(err));*/

/*sgMail.setApiKey(API_KEY);
const msg = {
  to: ["ankitdewangan2002@gmail.com"], // Change to your recipient
  from: {
    name: "Ankit Dewangan",
    email: "ankitdewangan2002@gmail.com",
  }, // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<body><h1>Ankit Dewangan<h1><p>hi this is a paragraph</p><body>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });*/

// creates the cronjob instance with startScheduler
const task = cron.schedule(
  "*/10 * * * * *",
  () => {
    console.log("test cronjob running every 10secs");
  },
  {
    scheduled: false,
  }
);

app.post("/scheduler", async (req, res) => {
  // gets the id from the button
  const id = req.body.id;
  try {
    // finds the scheduler data from the MongoDB
    const scheduler = await Shedular.find({ id: id });

    // checks whether there is a scheduler or not
    if (!scheduler) {
      return res.json({
        error: "No scheduler found.",
      });
    }

    // checks if the scheduler is already running or not. If it is then it stops the scheduler
    if (scheduler.isRunning) {
      // scheduler stopped
      task.stop();

      return res.json({
        message: "Scheduler stopped!",
      });
    }

    // starts the scheduler
    task.start();

    res.json({
      message: "Scheduler started!",
    });
  } catch (e) {
    console.log(e);
  }
});

app.put("/:id", async (req, res) => {
  const category = await Shedular.findByIdAndUpdate(
    req.params.id,
    {
      isRunning: true,
    },
    { new: true }
  );
  if (!category) return res.status(400).send("No Such Ctegory Found");
});

//--------------------------------
// array.forEach((element) => {
//   axios
//     .get(
//       `https://apps.emaillistverify.com/api/verifyEmail?secret=hR94SNue91h5TZrji74Ir&email=${element}`,
//       {}
//     )
//     .then((response) => {
//       if (response.data === "ok" || response.data === "ok_for_all") {
//         console.log("Email Is Good To Send");
//       } else {
//         console.log(
//           "Email Is Not Good To Sent We Will Supress it Son"
//         );
//         encodedParams.set("email", `${element}`);
//         const url = `https://a.klaviyo.com/api/v1/people/exclusions?api_key=${apiKey}`;
//         const options = {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: encodedParams,
//         };
//         fetch(url, options)
//           .then((res) => res.json())
//           .then((json) => {
//             console.log(json);
//             email.push(element);
//             console.log(email);
//           })
//           .catch((err) => console.error("error:" + err));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
//--------------------------------------------------------

// if (email[0] != null) {
//   fetch("http://localhost:5000/email", {
//     method: "POST",
//     body: JSON.stringify({ email, apiKey, creditUsed }),
//     headers: { "Content-Type": "application/json" },
//   });
//   console.log("email Posted");
// } else {
//   console.log("No Bad Subscriber in the Last One Hour");
// }

// const sendEmail = cron.schedule(
//   "0 0 8 1 * *",
//   () => {
//     const msg = {
//       from: "ankitdewangan2002@gmail.com",
//       to: "eknoorsingh284@gmail.com",
//       subject: "Nodemailer Testing",
//       text: "Testing out first sender",
//     };

//     nodemailer
//       .createTransport({
//         service: "gmail",
//         auth: {
//           user: "ankitdewangan2002@gmail.com",
//           pass: "vieyynojztpjinwz",
//         },
//         port: 465,
//         host: "smtp.gmail.com",
//       })

//       .sendMail(msg, (err) => {
//         if (err) {
//           return console.log("Error Occurs", err);
//         } else {
//           return console.log("Email sent");
//         }
//       });
//   },
//   {
//     scheduled: false,
//   }
// );

/*encodedParams.set("email", `${element}`);
                  const url =
                    `https://a.klaviyo.com/api/v1/people/exclusions?api_key=${apiKey}`;
                  const options = {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedParams,
                  };

                  fetch(url, options)
                    .then((res) => res.json())
                    .then((json) => console.log(json))
                    .catch((err) => console.error("error:" + err));*/

/*var E, result;
E = new EmailListVerifyOne("dJNY1Slm10H1MYD7jVqRI", "ankitdewangan2002@gmail.com");
result = E.control();
console.log(result);*/

/*console.log("sending email...");
sendMail("Hello world", "this is email body it can contain html also");
console.log("email sent ✓");*/

//https://apps.emaillistverify.com/api/verifyEmail
//https://apps.emaillistverify.com/api/verifyEmail?secret=dJNY1Slm10H1MYD7jVqRI&email=ankitdewangan2002@gmail.com

//hR94SNue91h5TZrji74Ir

//vieyynojztpjinwz

/*const msg = {
  from: "ankitdewangan2002@gmail.com",
  to: "eknoorsingh284@gmail.com",
  subject: "Nodemailer Testing",
  text: "Testing out first sender"
};

nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ankitdewangan2002@gmail.com",
    pass: "vieyynojztpjinwz"
  },
  port: 465,
  host: 'smtp.gmail.com'
})

.sendMail(msg, (err)=>{
  if(err){
    return console.log('Error Occurs', err);
  }else {
    return console.log('Email sent')
  }
})*/

/*const url =
  "https://a.klaviyo.com/api/v1/person/01G5EH34C8R44VPPZHC230WSKA/metric/SQhcxZ/timeline?count=50&sort=desc&api_key=pk_ce701a610f1446f71352a68245c1c92ef6";
const options = { method: "GET", headers: { Accept: "application/json" } };

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    count = data;
    arr = data.data[0];
    array = data.data;
    console.log(count.count);
    array.map((value) => {
      console.log(value),
        fetch("http://localhost:5000/profile", {
          method: "POST",
          body: JSON.stringify(value),
          headers: { "Content-Type": "application/json" },
        });
    });
  })
  .catch((err) => console.error("error:" + err));*/

/* const d = new Date();
    date = json.data[0].timestamp
      d.setDate(date);
      console.log(d)
    let text = d.toLocaleString();
    console.log(text);
   
   
    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 180);
    if (json.data[0].timestamp > myPastDate) {
      console.log(true);
    } else {
      console.log(false);
    }
    arr = json.data;
    arr.forEach((element) => {
      if (element.timestamp < myPastDate) {
        console.log(element.email);
        console.log(element.timestamp);
      }
    });
    console.log(myPastDate);*/

/* console.log(myPastDate);
    console.log(myPastDate == myPastDate);
    const x = new Date(myPastDate);
    const y = new Date(d);
    
    console.log('x < y', x < y); // false*/
