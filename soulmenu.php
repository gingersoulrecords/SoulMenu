<?php
/*
Plugin Name: SoulMenu
Plugin URI: http://gingersoulrecords.com/soulmenu
Description: A simple shortcode to insert a menu.
Version: 0.1.0
Author: Dave Bloom
Author URI: http://gingersoulrecords.com
Text Domain: soulmenu
*/


if ( ! class_exists( 'SoulMenu' ) ) {
  add_action( 'plugins_loaded', array( 'SoulMenu', 'init' ) );

  class SoulMenu {
    public static $plugin_path = '';
    public static function init() {
      self::$plugin_path = plugin_dir_path( __FILE__ );
      add_shortcode( 'soulmenu',            array( 'SoulMenu', 'shortcode' ) );
      add_action( 'wp_enqueue_scripts', 		array( 'SoulMenu', 'styles' ) );

      add_action( 'admin_enqueue_scripts',  array( 'SoulMenu', 'admin_scripts' ) );
      // TO DO: do a better Beaver Builder detection.
      if ( isset( $_REQUEST['fl_builder'] ) && is_user_logged_in() ) {
        add_action( 'wp_enqueue_scripts',  array( 'SoulMenu', 'admin_scripts' ) );
      }
      // Abnormally large priority is a workaround Beaver Builder trying to disable third party buttons in WP Editor.
      add_filter( 'mce_external_plugins', array( 'SoulMenu', 'editor_button_js' ), 999999999 );
      add_filter( 'mce_buttons', 			    array( 'SoulMenu', 'editor_button' ), 999999999 );

    }
    /**
    * Add SoulMenu button to WP Editor
    *
    * @param array $buttons list of editor buttons.
    * @return array
    */
    public static function editor_button( $buttons ) {
      array_push( $buttons, 'soulmenu_shortcode' );
      return $buttons;
    }
    /**
    * Add SoulMenu WP Editor button JS file
    *
    * @param array $plugin_array list of editor button JS files.
    * @return array
    */
    public static function editor_button_js( $plugin_array ) {
      $plugin_array['soulmenu'] = plugins_url( 'soulmenu-button.js', __FILE__ );
      return $plugin_array;
    }

    /**
    * Enqueue SoulMenu WP Admin scripts
    */
    public static function admin_scripts() {
      wp_register_script( 'soulmenu-admin', plugins_url( 'soulmenu-admin.js', __FILE__ ), array( 'jquery' ) );
      $menus = get_terms( 'nav_menu' );
      foreach($menus as $key => $menu){
        $menus[ $key ] = array(
          'text'  => $menu->name,
          'value' => $menu->term_id,
          );
        }
        $data = array(
          'icon' => plugins_url( 'soulmenu-button.png', __FILE__ ),
          'texts' => array(
            'main_label' 			=> __( 'Main', 'soulmenu' ),
            'advanced_label'	=> __( 'Advanced', 'soulmenu' ),
            'menu_label' 		  => __( 'Menu', 'soulmenu' ),
            'style_label' 		=> __( 'Style', 'soulmenu' ),
            'style_options'   => array(
              array(
                'text'  => __( 'Vertical (default)', 'soulmenu' ),
                'value' => '',
              ),
              array(
                'text'  => __( 'Horizontal', 'soulmenu' ),
                'value' => 'horizontal',
              ),
            ),
            'menu_options'          => $menus,
            'add_dialog_title'  		=> __( 'Add SoulMenu', 'soulmenu' ),
          ),
        );
        wp_localize_script( 'soulmenu-admin', 'soulmenu', $data );
        wp_enqueue_script( 'soulmenu-admin' );
      }

      public static function shortcode( $args = array(), $content = '' ) {
        $defaults = array(
        'style' => 'vertical',
        'menu_class' => 'menu',
        'echo'  => false,
        );
        $args = wp_parse_args( $args, $defaults );
        $style = $args['style'];
        unset( $args['style'] );
        $args['menu_class'] .= " soulmenu soulmenu-style-{$style}";
        return wp_nav_menu( $args );
      }
      public static function styles() {
        wp_register_script( 'soulmenu', plugins_url( 'soulmenu.js', __FILE__ ), array( 'jquery' ) );
        wp_register_style( 'soulmenu', plugins_url( 'soulmenu.css', __FILE__ ) );
        wp_enqueue_style( 'soulmenu' );
        wp_enqueue_script( 'soulmenu' );
      }
    }
  }

