import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: "1000464726636-sbl4orutbgm82clubtvuhhov1670vhip.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // yahan ap apna user find/create logic lagayen
      console.log("Google Profile:", profile);
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
