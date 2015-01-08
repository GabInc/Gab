Tasks = new Mongo.Collection("tasks");
Messages = new Mongo.Collection("messages");
if (Meteor.isClient) {
  // This code only runs on the client

   Template.body.helpers({
    messages: function () { 
      return Messages.find({}, {sort: {createdAt: -1}});
    },
    tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    "submit .new-message": function (event) {
      // This function is called when the new task form is submitted
      var text = event.target.text.value;
      if (Meteor.user())
        var name = Meteor.user().username;
      else
        var name = 'Anonymous'; 

      Messages.insert({
        text: text,
        name: name,
        createdAt: new Date() // current time
        
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },    
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    },
    "click #message-icon": function () {
      Meteor.logout();
    }
  });

  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}


