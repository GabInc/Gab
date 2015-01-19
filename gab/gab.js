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
    followed: function () {
      return Meteor.user().profile.friends;
    },
    name: function (id) {
      return Meteor.users.findOne({_id:id}).username;
    },
    friends:function () {
      var followeds = Meteor.user().profile.friends;
      var friends = [];
      var friend;
      for (f in followeds)
      {
        var u_id = Meteor.userId();
        var friend_id = followeds[f].id;
        var user = Meteor.users.findOne({_id:friend_id});
	var friend_friends = user.profile.friends;
	for (fr in friend_friends)
	{
	  var fr_id = friend_friends[fr].id;
	  if (fr_id === u_id)
	    friends.push(user);
	}
//  Voir si on peu pas améliorer avec indexOf ou de quoi d'autre
//
//        if (friend_friends.indexOf(u_id) < 0) 
//          friends.push(user);
//	  var indexof = friend_friends.indexOf(u_id);
//	  console.log(u_id)
//        console.log(friend_friends)
      }
      return friends;
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
        Meteor.users.update({_id:u_id}, { $addToSet: {"profile.friends": {"id": friend_id} } });
      } else {
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      }
    }
  });
}
