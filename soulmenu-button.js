( function() {
    tinymce.PluginManager.add( 'soulmenu', function( editor, url ) {
        editor.addButton( 'soulmenu_shortcode', {
            image: soulmenu.icon,
            onclick: function() {
                var win = editor.windowManager.open( {
                    title: soulmenu.texts.add_dialog_title,
                    bodyType: 'tabpanel',
                    body: [{
                        type: 'form',
                        title: soulmenu.texts.main_label,
                        items: [
                        {
                            type: 'listbox',
                            name: 'menu',
                            value: '',
                            label: soulmenu.texts.menu_label,
                            values: soulmenu.texts.menu_options,
                        },
                        {
                            type: 'listbox',
                            name: 'style',
                            label: soulmenu.texts.style_label,
                            values: soulmenu.texts.style_options,
                        }
                        ],
                    // },{
                    //     type: 'form',
                    //     title: soulmenu.texts.advanced_label,
                    //     items: [
                        //   {
                        //     type: 'listbox',
                        //     name: 'align',
                        //     label: soulmenu.texts.align_label,
                        //     values: soulmenu.texts.align_options,
                        //   },{
                        //     type: 'textbox',
                        //     name: 'icon',
                        //     label: soulmenu.texts.icon_label,
                        //     tooltip: soulmenu.texts.icon_tooltip,
                        //   },{
                        //     type: 'listbox',
                        //     name: 'icon-position',
                        //     label: soulmenu.texts.iconpos_label,
                        //     values: soulmenu.texts.iconpos_options,
                        //   },{
                        //     type: 'textbox',
                        //     name: 'target',
                        //     label: soulmenu.texts.target_label,
                        //     tooltip: soulmenu.texts.target_tooltip,
                        //   },{
                        //     type: 'listbox',
                        //     name: 'target-effect',
                        //     label: soulmenu.texts.targeteffect_label,
                        //     values: soulmenu.texts.targeteffect_options,
                        // }
                        // ],
                    }],
                    onsubmit: function( e ) {
                        var result = win.toJSON();
                        var atts = '';
                        var content = '';
                        for ( var key in result ) {
                            if ( !result[key] ) {
                                continue;
                            }
                            if ( 'content' === key ) {
                              content = result[key];
                              continue;
                            }
                            atts += ' ' + key  + '="' + result[key] + '"';
                        }
                        editor.insertContent( '[soulmenu ' + atts + '] ' );
                    }
                } );
            }
        } );
    } );
} )();
