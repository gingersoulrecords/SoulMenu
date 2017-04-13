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

add_action( 'plugins_loaded', array( 'SoulMenu', 'init' ) );

class SoulMenu {
  public static $plugin_path = '';
	public static function init() {
		self::$plugin_path = plugin_dir_path( __FILE__ );
    add_shortcode( 'soulmenu',            array( 'SoulMenu', 'shortcode' ) );
    add_action( 'wp_enqueue_scripts', 		array( 'SoulMenu', 'styles' ) );

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
    $args['menu_class'] .= " soulmenu-style-{$style}";
    return wp_nav_menu( $args );
  }
  public static function styles() {
		wp_register_style( 'soulmenu', plugins_url( 'soulmenu.css', __FILE__ ) );
		wp_enqueue_style( 'soulmenu' );
	}
}
