Tasks = new Mongo.Collection("tasks");
Messages = new Mongo.Collection("messages");
if (Meteor.isClient) {
  // This code only runs on the client
   var okcancel_events = function (selector) {
     return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
   };
   var make_okcancel_handler = function (options) {
     var ok = options.ok || function () {};
     var cancel = options.cancel || function () {};
     
     return function (evt) {
       if (evt.type === "keydown" && evt.which === 27) {
         cancel.call(this, evt);
       } else if (evt.type === "keyup"  && evt.which === 13){
       var value = String(evt.target.value || "");
       if (value)
         ok.call(this, value, evt);
       else
         cancel.call(this, evt);
       }
     };        
   };
   Template.mess_box.events = {};
   
   Template.mess_box.events[okcancel_events('#message')] = make_okcancel_handler({
     ok: function (text, event) {
       var user_name = Meteor.user().username
       var ts = Date.now() / 1000;
       Messages.insert({ name: user_name.value, message: text, time: ts});
       event.target.value = "";
     }
   });
   
   Template.messages.messages = function () {
     return Messages.find({}, { sort: {createdAt: -1} });
   };
   Template.body.helpers({
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


