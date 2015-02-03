Tasks = new Mongo.Collection("tasks");
Conversations = new Mongo.Collection("conversations");
Posts = new Mongo.Collection("posts");
Messages = new Mongo.Collection("messages");
Tags = new Mongo.Collection("tags");
Childtags = new Mongo.Collection("childtags");
Activities = new Mongo.Collection("activities");
Links = new Mongo.Collection("links");


EasySearch.createSearchIndex('users', {
    'field' : ['username'],
    'collection' : Meteor.users,
    'limit' : 20
});



Router.route('/', function () {
  this.layout('ApplicationLayout');
  this.render('Home');
  this.render('navbar', {to: 'navbar'});
  this.render('Footer', {to: 'footer'});
});
Router.route('/admin', function () {
  this.render('Admin', {
    data: function(){
    var id = this.params._id;
    var current_userid = Meteor.userId();
    templateData = { allusers: Meteor.users.find({_id:{$ne: current_userid}}), tags: Tags.find(), activities: Activities.find(), childtags: Childtags.find()};
    return templateData;
    }
  });
});
Router.route('/profile', function () {
  this.layout('ApplicationLayout');
  this.render('friends');
  this.render('navbar', {to: 'navbar'});
  this.render('Footer', {to: 'footer'});
});

Router.route('/messages', function () {
  this.layout('ApplicationLayout');
  this.render('messages');
  this.render('navbar', {to: 'navbar'});
  this.render('Footer', {to: 'footer'});
});
Router.route('/feed', function () {
  this.layout('ApplicationLayout');
  this.render('feed');
  this.render('navbar', {to: 'navbar'});
  this.render('Footer', {to: 'footer'});
});
Router.route('/act/:slug', function () {
  this.layout('ApplicationLayout');
  this.render('activity', {
    data: function () {
      var slug = this.params.slug;
      if (Activities.findOne({slug: slug})){
        var act_id = Activities.findOne({slug: slug})._id;
	var alltags = Tags.find();
        var maintags = []
        alltags.forEach(function (doc){
          var tag_acts = doc.activities;
	  if (tag_acts)
	    var x = tag_acts.indexOf(act_id);
	    if (x > -1)
	      maintags.push(doc);
	});
      }  
      templateData = {activity: Activities.findOne({slug: slug}), tags: maintags};
      return templateData;
    }  
  });
});

Router.route('/tag/:slug', function () {
  this.layout('ApplicationLayout');
  this.render('tag', {
    data: function () {
      var slug = this.params.slug;
      var no_child = false;
      if (Tags.findOne({slug: slug})){
        var tag_id = Tags.findOne({slug: slug})._id;
        var allchildtags = Childtags.find();
	var childtags = []
	allchildtags.forEach(function (doc){
          var tag_tags = doc.tags;
	  if (tag_tags)
	    var x = tag_tags.indexOf(tag_id);
	    if (x > -1 )
	      var ctag_id = doc._id
	      var links = []
	      var alllinks = Links.find();
	      alllinks.forEach(function (link){
                var link_tags = link.tags;
		if (link_tags)
		  var x = link_tags.indexOf(ctag_id);
		  if (x > -1)
		    links.push(link);
	      });
	      console.log(links)
	      var tag_link = {tag: doc, links: links}
	      childtags.push(tag_link);
	});
	// Voir avec Gab si encore necessaire
	if (childtags.length == 0) 
	  var no_child = true;
          var alllinks = Links.find();
	  var links = []
          alllinks.forEach(function (doc){
	    var link_tags = doc.tags;
            if (link_tags)
              var x = link_tags.indexOf(tag_id);
              if (x > -1)
                links.push(doc);
	  });										     
      }
      templateData = {links: links, tag: Tags.findOne({slug: slug}), tags: childtags, no_child: no_child};
      return templateData;
    }
  });
});

Router.route('/links/:slug', function () {
  this.layout('ApplicationLayout');
  this.render('links', {
    data: function () {
      var slug = this.params.slug;
      if (Childtags.findOne({slug: slug})){
        var ctag_id = Childtags.findOne({slug: slug})._id;
	var alllinks = Links.find();
	var links = []
	alllinks.forEach(function (doc){
          var link_tags = doc.tags;
	  if (link_tags)
	    var x = link_tags.indexOf(ctag_id);
	    if (x > -1)
	      links.push(doc);
	});
      }
      templateData = {tag: Childtags.findOne({slug: slug}), links: links};
      return templateData;
	    
    }
  });
});

Router.route('/messages/:_id', function () {
  this.layout('ApplicationLayout');
  this.render('message_box', {
    data: function () {
      var id = this.params._id;
      templateData = { messages: Messages.find({conversation_id: id}, {sort: {createdAt: 1}}) };
      return templateData;
    }
  });
  this.render('navbar', {to: 'navbar'});
  this.render('Footer', {to: 'footer'});
}, {
  name: 'conversations.show',
  after: function () {
    var id = this.params._id;
    Session.set("active_conv", id);
  }

});  


UI.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
     return {index: index, value: val};
    });
});

UI.registerHelper('equals', function (a, b) {
    return a === b;
});

if (Meteor.isServer) {

  Meteor.startup(function() {
    return Meteor.methods({
      removeAllConvs: function() {
	return Conversations.remove({});
      },
      removeAllPosts: function() {
        return Posts.remove({});
      },
      removeAllMess: function() {
        return Messages.remove({});
      },
      removeAllTags: function() {
        return Tags.remove({});
      },
      removeAllActs: function() {
        return Activities.remove({});
      },
      removeAllLinks: function() {
        return Links.remove({});
      },
      removeAllChildtags: function() {
        return Childtags.remove({});
      },	
    });
  });

  Meteor.users.allow({
    update: function (userId, doc, fields, modifier) {
      if (Meteor.users.findOne({_id: userId}).profile.cat.is_staff === true){
        return true;
      } else {
        return false;
      }
    }
  });
}  
if (Meteor.isClient) {

  Meteor.startup(function() {
  });


  Template.feed.helpers({
    posts: function () { 
      return Posts.find({}, {sort: {createdAt: -1}});
    },
  });
  Template.Admin.helpers({
    images: function(){
      return Images.find({});
    },
  
  });
  Template.Home.helpers({
//    activities: function () {
//      return Activities.find({});
//    },
    current_day: function () {
      var d = new Date();
      var weekday = new Array(7);
      weekday[0]=  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var day = weekday[d.getDay()];
      if ( d.getHours() < 12 && d.getHours() >= 5){
        var part = "morning";
      } else if ( d.getHours() >= 12 && d.getHours() <= 17 ){
        var part = "afternoon";
      } else if (d.getHours() > 17 && d.getHours() <= 23 ){
        var part = "evening";
      } else {
        var part = "night";
      }
      var activities = [];
      var all_activities = Activities.find({});
      all_activities.forEach(function (doc){
        var times = doc.times;
	if (times)
	  var x = times.indexOf(part);
	    if (x > -1)
	      activities.push(doc);
      });
      return {day: day, part: part, activities: activities,};
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
      var u_id = Meteor.userId();
      var convs = Conversations.find({}, {sort: {createdAt: -1}});
      var uconvs = [];
      var c;
      convs.forEach(function (conversation){
        var participants = conversation.participants;
	if (participants)
          var p = participants.indexOf(u_id);
          if (p > -1)
	    uconvs.push(conversation);
      });
      return uconvs;  
    },
    last_message: function(id){
      return Messages.findOne({conversation_id:id}).text;

    },
    other_user: function(id){
      var conv_participants = Conversations.findOne({_id:id}).participants;
      var user_id = Meteor.userId();
      var index = conv_participants.indexOf(user_id);
      if (index > -1) {
        conv_participants.splice(index, 1);
      }
      var o_id = conv_participants[0];
      if (Meteor.users.findOne({_id:o_id}).username){
        var name = Meteor.users.findOne({_id:o_id}).username;
      } else {
        var name = "No name";
      }
      return name;
    },
    username: function(id){
      var author_id = Messages.findOne({conversation_id:id}).author_id;
      return Meteor.users.findOne({_id:author_id}).username;
    },  
  });
  Template.friends.helpers({   
    friends:function () {
      if (Meteor.user()){
        var followeds = Meteor.user().profile.friends;
      } else {
        var followeds = [];
      }	
      var friends = [];
      var folls = [];
      var u_id = Meteor.userId();
      var f;
      for (f in followeds)
      {
        var friend_id = followeds[f].id;
        var user = Meteor.users.findOne({_id:friend_id});
	var friend_friends = Meteor.users.findOne({_id:friend_id}).profile.friends;
        folls.push(user);
	for (fr in friend_friends)
	{
	  var fr_id = friend_friends[fr].id;
	  if (fr_id === u_id)
	    friends.push(user);
	}
      }
      return {folls: folls, friends: friends};
    },
    followers:function () {
      var user_id = Meteor.userId();
      if (Meteor.users.find()){
        var users = Meteor.users.find();
      } else {
        var users = []
      }
      var followers = [];
      users.forEach(function(doc){
        if (doc.profile){
	  var user_fs = doc.profile.friends;
	  var z;
	  var id = doc._id;
	  var u = Meteor.users.findOne({_id:id});
	  for (z in user_fs){
	    var y = user_fs[z].id;
            if (y === user_id){
	      followers.push(u);
	    } 
	  }
	}  
      });
      return followers;  
    },
  }); 


  Template.feed.events({
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
    },
    "click #feed": function (){
      Router.go('/feed');
    },
    
  });
  Template.navbar.events({
    "click #admin": function () {
      Router.go('/admin');
    },
  });
  Template.friends.events({
    "click #new_conv": function () {
      var u_id = Meteor.userId();
      var friend_id = this._id;
      var participants = [u_id, friend_id]
      var participants_inv = [friend_id, u_id]
      if (Conversations.findOne({participants: participants})) {
	var conv_id = Conversations.findOne({participants: participants})._id;
        Router.go('/messages/'+conv_id+'');
      } else if (Conversations.findOne({participants: participants_inv})){
          var conv_id = Conversations.findOne({participants: participants_inv})._id;
	  Router.go('/messages/'+conv_id+'');
      } else {
        Conversations.insert({
          participants: participants,
	  started_by: u_id,
	  createdAt: new Date()
        });
      
        var last_conv_id = [];
        var last_conv = Conversations.find({started_by: u_id}, {sort: {createdAt: -1},limit:1});
        last_conv.forEach(function(doc){
        last_conv_id.push(doc._id);
	});
        Router.go('/messages/'+last_conv_id+'');
      }
    },
    "click #follow_button": function () {
      var u_id = Meteor.userId();
      var friend_id = this._id;
      if (Meteor.user().profile.friends) {
        Meteor.users.update({_id:u_id}, { $addToSet: {"profile.friends": {"id": friend_id} } });
      } else {
        Meteor.users.update({_id:u_id}, { $set: {"profile.friends": [{"id": friend_id}] } });
      }
    },

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
      var elem = document.getElementById('wrapper_messages');
      elem.scrollTop = elem.scrollHeight;
      return false;
    },  
  });

  Template.post.events({
    "click .delete": function () {
      Posts.remove(this._id);
    }
  });
  Template.activity.events({
    "click .back-button": function (){
      history.back();
    } 
  });
  Template.tag.events({
    "click .back-button": function (){
      history.back();
    }
  });  
  Template.Admin.events({
    "submit #new-img": function (event) {
      FS.Utility.eachFile(event, function(file) {
      			Images.insert(file);
					});
    },
    "submit #new-tag": function (event) {
      var name = event.target.name.value;
      var desc = event.target.desc.value;
      var slug = event.target.slug.value;
      var activities = $('#activities').val();
      Tags.insert({
        name: name,
	desc: desc,
	slug: slug,
	activities: activities,
	createdAt: new Date()
      });
    },
    "submit #new-child-tag": function (event) {
      var name = event.target.name.value;
      var desc = event.target.desc.value;
      var slug = event.target.slug.value;
      var tags = $('#tags').val();
      Childtags.insert({
         name: name,
	 desc: desc,
	 slug: slug,
	 tags: tags,
	 createdAt: new Date()
      });
    },
    "submit #new-act": function (event) {
      var name = event.target.name.value;
      var desc = event.target.desc.value;
      var slug = event.target.slug.value;
      var file_name = event.target.file_name.value;
      var times = $('#times').val();
      Activities.insert({
        name: name,
	desc: desc,
        slug: slug,
	file_name: file_name,
	times: times,
        createdAt: new Date()
      });
    },
    "submit #new-link": function (event) {
      var url = event.target.url.value;
      if (event.target.lang.value){
        var lang = event.target.lang.value;
      }	else {
        var lang = "en";
      }
      var ctags = $('#ctags').val();
      Links.insert({
        url: url,
	language: lang,
	tags: ctags,
        createdAt: new Date()
      });    
    },
    "click #make_staff": function() {
      var id = this._id;
      var user = Meteor.users.findOne({_id:id});
      Meteor.users.update({_id:id},{$set: {"profile.cat": {"is_staff": true } } });
    },
    "click #remove_staff": function() {
      var id = this._id;
      var user = Meteor.users.findOne({_id:id});
      Meteor.users.update({_id:id},{$set: {"profile.cat": {"is_staff": false } } });
    },

    "click #del_convs": function () {
      Meteor.call('removeAllConvs');
    },
    "click #del_mess": function () {
      Meteor.call('removeAllMess');
    },
    "click #del_tags": function () {
      Meteor.call('removeAllTags');
    },
    "click #del_posts": function () {
      Meteor.call('removeAllPosts');
    },
    "click #del_acts": function () {
      Meteor.call('removeAllActs');
    },
    "click #del_links": function () {
      Meteor.call('removeAllLinks');
    },
    "click #del_childtags": function () {
      Meteor.call('removeAllChildtags');
    },  
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
