Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");
Messages = new Mongo.Collection("messages");

EasySearch.createSearchIndex('users', {
    'field' : ['username'],
    'collection' : Meteor.users,
    'limit' : 20
});



Router.route('/', function () {
  this.layout('ApplicationLayout');
  this.render('Home');
  this.render('Footer', {to: 'footer'});
});

Router.route('/profile', function () {
  this.layout('ApplicationLayout');
  this.render('profile');
  this.render('Footer', {to: 'footer'});
});

Router.route('/messages', function () {
  this.layout('ApplicationLayout');
  this.render('messages');
  this.render('Footer', {to: 'footer'});
});
Router.route('/messages/:_id', function () {
  this.layout('ApplicationLayout');
  this.render('message_box', {
    data: function () {
      var id = this.params._id;
      templateData = { messages: Messages.find({conversation_id: id}, {sort: {createdAt: -1}}) };
      return templateData;
//      var test = "test";
//      return test;
    }
  });
  this.render('Footer', {to: 'footer'});
}, {
  name: 'conversations.show',
  after: function () {
    var id = this.params._id;
    Session.set("active_conv", id);
  }

});  



if (Meteor.isClient) {

  Meteor.startup(function() {
  });


  Template.profile.helpers({
    posts: function () { 
      return Posts.find({}, {sort: {createdAt: -1}});
    },
  });
  
  Template.post.helpers({
    username: function (id) {
      return Meteor.users.findOne({_id:id}).username;
    },
  });
  Template.message.helpers({
    username: function (id) {
      return Meteor.users.findOne({_id:id}).username;
    },
  });  
  Template.conversations.helpers({
    conversations: function (){
    // A ajuster... pour si participants
      var u_id = Meteor.userId();
      return Conversations.find({started_by: u_id}, {sort: {createdAt: -1}});
    },
    last_message: function(id){
      return Messages.findOne({conversation_id:id}).text;

    },
    username: function(id){
      var author_id = Messages.findOne({conversation_id:id}).author_id;
      return Meteor.users.findOne({_id:author_id}).username;
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


  Template.profile.events({
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
  });
  Template.Footer.events({
    "click #home": function () {
      Router.go('/');
    },
    "click #profile": function () {
      Router.go('/profile');
    },
    "click #logout": function () {
      Meteor.logout();
    },
    "click #messages": function () {
      Router.go('/messages');
    }  
  });
  Template.friends.events({
    "click #new_conv": function () {
      var u_id = Meteor.userId();
      var friend_id = this._id;
      var participants = [u_id, friend_id]
      Conversations.insert({
        participants: participants,
	started_by: u_id,
	createdAt: new Date()
      });
// Aller direct au messages...      
      Router.go('/messages/');
    }
  });
  Template.message_form.events({
    "submit #new-message": function (event) {
      var text = event.target.text.value;
      if (Meteor.user())
        var author_id = Meteor.userId();
	var conversation_id = Session.get("active_conv");
      Messages.insert({
        text: text,
        author_id: author_id,
        conversation_id :conversation_id,
        createdAt: new Date()
      });
      event.target.text.value = "";
      return false;
    },  
  });

  Template.post.events({
    "click .delete": function () {
      Posts.remove(this._id);
    }
  });
  Template.search_user.events({
    "click #add_button": function () {
      var u_id = Meteor.userId();
      var friend_id = this._id;
      if (Meteor.user().profile.friends) {
        Meteor.users.update({_id:u_id}, { $addToSet: {"profile.friends": {"id": friend_id} } });
      } else {
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      }
      console.log("ben oui")
    }
  });
  Template.conversations.events({
    "click #conversation": function () {
      Router.go('conversations.show', {_id: this._id});

    },
    "click #delete_conversation": function () {
      Conversations.remove(this._id);
    },
    "click #open_conversation": function () {
      Session.set("active_conv", this._id)      
    }
  });
}
