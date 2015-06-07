AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
  template: 'register'
});
AccountsTemplates.configureRoute('signIn', {
  name: 'sign-in',
  path: '/sign-in',
  template: 'signIn'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'change-password',
  path: '/change-password',
  template: 'changePassword'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgot-password',
  path: '/forgot-password',
  template: 'forgotPassword'
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'reset-password',
  path: '/reset-password',
  template: 'resetPassword'
});

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: false,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: false,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy-policy',
    termsUrl: 'terms-and-conditions',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
      title: {
        changePwd: "",
        enrollAccount: "",
        forgotPwd: "",
        resetPwd: "",
        signIn: "",
        signUp: "",
        verifyEmail: ""
      },
      button: {
        changePwd: "Change Password",
        enrollAccount: "Enroll",
        forgotPwd: "Reset Password",
        resetPwd: "Reset Password",
        signIn: "Sign In",
        signUp: "Register Now!",
      },
      errors: {
          accountsCreationDisabled: "Sorry, Accounts creation is restricted.",
          cannotRemoveService: "Cannot remove the only active service.",
          captchaVerification: "Captcha verification failed, please try again",
          loginForbidden: "Incorrect user or password.",
          mustBeLoggedIn: "Please log in.",
          pwdMismatch: "error.pwdsDontMatch",
          validationErrors: "Please verify all fields are correct.",
          verifyEmailFirst: "Please verify your email first. Check your email and follow the link!",
      }
    },
});

// Login with username or email
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 1,
      func: function(value){
        if (Meteor.isClient) {
            var self = this;
            Meteor.call("isUsernameTaken", value, function(err, isUsernameTaken){
                if (isUsernameTaken) {
                  self.setError('Username unavailable');
                } else {
                  self.setSuccess();

                }
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("isUsernameTaken", value);
      },
      errStr: 'Username unavailable'
  },
  {
      _id: "slug",
      type: "hidden",
      transform: function() {
        return getSlug($('#at-field-username').val());
      }
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      func: function(value){
        if (Meteor.isClient) {
            var self = this;
            Meteor.call("isEmailRegistered", value, function(err, isEmailRegistered){
                if (isEmailRegistered) {
                  self.setError('Email already registered');
                } else {
                  self.setSuccess();

                }
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("isEmailRegistered", value);
      },
      errStr: 'Invalid email',
  },
  pwd
]);

if (Meteor.isServer){
    Meteor.methods({
        "isUsernameTaken": function(username){
            var slug = getSlug(username);
            return !!Meteor.users.findOne({'profile.slug': slug});
        },
        "isEmailRegistered": function(email){
            return !!Meteor.users.findOne({emails: { $elemMatch: { address: email } }});
        }
    });
}
