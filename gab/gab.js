Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");

Posts.initEasySearch(['text'], {
    'limit' : 20
});


if (Meteor.isClient) {

  Template.content.helpers({
    posts: function () { 
      return Posts.find({}, {sort: {createdAt: -1}});
    },
  });
  
  Template.post.helpers({
    username: function (id) {
      return Meteor.users.findOne({_id:id}).username;
    },
  });
  
  Template.body.events({
    "submit .new-post": function (event) {
      var text = event.target.text.value;
      if (Meteor.user())
        var author_id = Meteor.userId();
      Posts.insert({
        text: text,
        author_id: author_id,
        createdAt: new Date() 
      });
      event.target.text.value = "";
      return false;
    },    
    "click #message-icon": function () {
      Meteor.logout();
    }
  });

  Template.post.events({
    "click .delete": function () {
      Posts.remove(this._id);
    }
  });

}
