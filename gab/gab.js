Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");



if (Meteor.isClient) {
  // This code only runs on the client

  Template.content.helpers({
    posts: function () { 
      return Posts.find({}, {sort: {createdAt: -1}});
    },
  });

  Template.body.events({
    "submit .new-post": function (event) {
      var text = event.target.text.value;
      if (Meteor.user())
        var user_id = Meteor.userId();
      Posts.insert({
        text: text,
        user_id: user_id,
        createdAt: new Date() // current time
        
      });
      event.target.text.value = "";
      return false;
    },    
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    },
    "click #message-icon": function () {
      Meteor.logout();
    }
  });
}
