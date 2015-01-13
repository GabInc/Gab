Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_birthday', 'public_profile', 'user_friends', 'user_likes', ],
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
