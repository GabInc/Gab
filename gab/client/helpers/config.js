Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_birthday', 'public_profile'],
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
