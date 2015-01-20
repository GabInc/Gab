Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");

EasySearch.createSearchIndex('users', {
    'field' : ['username'],
    'collection' : Meteor.users,
    'limit' : 20
});




if (Meteor.isClient) {

  Meteor.startup(function() {
    var u_id = Meteor.userId();
    var con = Conversations.find({started_by: u_id}, {sort: {createdAt: -1},limit: 1});
    Session.set("active_conv", con );
    console.log(con);
  });


  Template.content.helpers({
    posts: function () { 
      var active_conv_id = Session.get("active_conv");
      return Posts.find({conversation_id: active_conv_id}, {sort: {createdAt: -1}});
    },
  });
  
  Template.post.helpers({
    username: function (id) {
      return Meteor.users.findOne({_id:id}).username;
    },
  });

  Template.conversations.helpers({
    conversations: function (){
    // A ajuster...
      return Conversations.find({}, {sort: {createdAt: -1}});
    },
  });
  Template.conversation.helpers({
    conversation: function (){
      return Session.get("active_conv");
    },
  });
  Template.friends.helpers({   
    friends:function () {
      var followeds = Meteor.user().profile.friends;
      var friends = [];
      var folls = [];
      var f;
      for (f in followeds)
      {
        var u_id = Meteor.userId();
        var friend_id = followeds[f].id;
        var user = Meteor.users.findOne({_id:friend_id});
	var friend_friends = user.profile.friends;
	for (fr in friend_friends)
	{
	  var fr_id = friend_friends[fr].id;
	  if (fr_id === u_id){
	    friends.push(user);
	  } else {
	  // A voir plus tard
	  //  folls.push(user);
	  }  
	}
      }
      return {friends: friends, followeds : folls};
    },
  }); 


  Template.body.events({
    "submit .new-post": function (event) {
      var text = event.target.text.value;
      if (Meteor.user())
        var author_id = Meteor.userId();
	var conversation_id = Session.get("active_conv"); 
      Posts.insert({
        text: text,
        author_id: author_id,
	conversation_id :conversation_id,
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
      var u_id = Meteor.userId(i);
      var friend_id = this._id;
      if (Meteor.user().profile.friends) {
        Meteor.users.update({_id:u_id}, { $addToSet: {"profile.friends": {"id": friend_id} } });
      } else {
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      }
    }
  });
  Template.friends.events({
    "click #message_button": function () {
      var u_id = Meteor.userId();
      var friend_id = this._id;
      var participants = [u_id, friend_id];
      Conversations.insert({
        participants: participants,
	started_by: u_id,
	createdAt: new Date()
      });     
    }
  });
  Template.conversations.events({
    "click #delete_conversation": function () {
      Conversations.remove(this._id);
    },
    "click #open_conversation": function () {
      Session.set("active_conv", this._id)      
    }
  });
}
