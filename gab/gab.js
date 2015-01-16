Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");

EasySearch.createSearchIndex('users', {
    'field' : ['username'],
    'collection' : Meteor.users,
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


  Template.friends.helpers({   
    friends: function () {
      return Meteor.user().profile.friends;
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
    "click #logout": function () {
      Meteor.logout();
    }
  });

  Template.post.events({
    "click .delete": function () {
      Posts.remove(this._id);
    }
  });
  Template.search_user.events({
    "click #add_button": function () {
      var u_id = Meteor.userId()
      var friend_id = this._id
      if (Meteor.user().profile.friends) {
        var friends = Meteor.user().profile.friends;
        //friends.update({},{id: friend_id})
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      } else {
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      }
    }
  });
}
