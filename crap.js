   
    # # ###
    #       #   Pre-Render Elements
    #       # ###
    #       class_reference.reduce ( concierge, reference  )->
    #         [type,klass] = reference
    #         name_reference[ type ].reduce ( ref, name )->
    #           instance = ref[name]
    #           instance.render()
    #           return ref
    #         , concierge[type]
    #         return concierge
    #       , @
    #       
    #       ###
    #       # Build Relationships (I love you guys!)
    #       ###
    #         
    #       name_reference.menu.reduce ( concierge, menu_name )->
    #         # begin build
    #         menu_structure = concierge.structures[ current_language_choice ].menu[ menu_name ]
    #         menu_instance  = concierge.menu[menu_name]
    #         action_names   = menu_structure.actions||[]
    #         if action_names.length
    #           menu_instance.action={}
    #           menu_instance.action_names = action_names
    #           menu_instance.action_count = action_names.length
    #           action_names.reduce ( menu, action_name )->
    #             action_structure = concierge.structures[ current_language_choice ].action[ action_name ]
    #             action_instance  = concierge.action[ action_name ]
    #             link_names       = action_structure.links||[]
    #             if link_names.length
    #               action_instance.link = {}
    #               action_instance.link_names = link_names
    #               action_instance.link_count = link_names.length
    #               link_names.reduce ( action, link_name )->
    #                   link_structure = concierge.structures[ current_language_choice ].link[ link_name ]
    #                   link_instance  = concierge.link[ link_name ]
    #                   action.link[ link_name ] = link_instance
    #                   return action
    #               , action_instance
    #             menu.action[action_name]=action_instance
    #             return menu
    #           , menu_instance
    #         return concierge
    #         # end build
    #       , @
    #       
    #       ###
    #       #  Build UI
    #       ###
    #       
    
    
    # name_reference.menu.map ( menuName )->
    #         lang       = concierge.visitor.get( 'language_choice' )                
    #         menu       = concierge.menu[ menuName ]
    #         menu_structure = concierge.structures[ lang ].menu[ menuName ]
    #         menu.on 'template_rendered', ->
    #           console.log 'on_menu_template_rendered'
    #           menu.jqueryElement.find( '.menu-actions' ).empty()
    #         actions = menu_structure.actions          
    #         actions.reduce ( parent, actionName )->
    #           action = concierge.action[ actionName ]
    #           action.ownerMenu = menu
    #           action_structure = concierge.structures[ lang ].action[ actionName ]          
    #           parent[ actionName ] = action
    #           menu.on 'template_rendered', -> 
    #             action.render()
    #             menu.jqueryElement.find( '.menu-actions' ).append action.jqueryElement
    #           menu.on 'template_updated', -> 
    #             action.update()  
    #       Object.keys( @menu ).map ( key )->
    #           concierge.menu[key].render()
    #           $('body').append concierge.menu[key].jqueryElement
    #           # links = action_structure.links||[]
    #           #           action.on 'template_rendered', ->
    #           #             console.log 'on_action_template_rendered'
    #           #             menu.jqueryElement.find( '.menu-links' ).empty()
    #           #           links.reduce ( parent, linkName )->
    #           #             link = concierge.link[ linkName ]
    #           #             console.log concierge.link
    #           #             link.ownerAction = action
    #           #             link.ownerMenu  = action.ownerMenu
    #           #             link_structure  = concierge.structures[ lang ].link[ linkName ]
    #           #             parent[ linkName ] = link
    #           #             action.on 'template_rendered', ->
    #           #               link.render()
    #           #               action.jqueryElement.find('.menu-links').append link.jqueryElement
    #           #             action.on 'template_updated', ->
    #           #               link.update()
    #           #             return parent  
    #           #           , action.links||={}     
    #           return parent
    #         , menu.actions={}
    #         # console.log 'toJSON', menu.toJSON()
    #         return menu
    #       return @