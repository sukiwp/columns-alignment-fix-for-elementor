<?php
/*
Plugin Name: Columns Alignment Fix for Elementor
Plugin URI: http://wordpress.org/plugins/columns-alignment-fix-for-elementor
Description: Add an option to fix Elementor's inconsistent columns alignment when using columns gap on sections.
Version: 1.1.0
Author: Suki WordPress Theme
Author URI: https://sukiwp.com/#about
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: columns-alignment-fix-for-elementor
Tags: 
*/

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) exit;

class Columns_Alignment_Fix_For_Elementor {
	/**
	 * Singleton instance
	 *
	 * @var Columns_Alignment_Fix_For_Elementor
	 */
	private static $instance;

	/**
	 * Get singleton instance.
	 *
	 * @return Columns_Alignment_Fix_For_Elementor
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class constructor
	 */
	protected function __construct() {
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );
		add_action( 'elementor/element/section/section_layout/before_section_end', array( $this, 'add_setting' ), 10, 2 );
		add_action( 'elementor/frontend/after_enqueue_styles', array( $this, 'add_css' ) );
	}

	/**
	 * Load plugin textdomain.
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'columns-alignment-fix-for-elementor' );
	}

	/**
	 * Add "Auto Columns Alignment" setting to section.
	 *
	 * @param \Elementor\Elements_Base $element
	 * @param array $args
	 */
	public function add_setting( $element, $args ) {
		$element->add_control(
			'fix_columns_alignment',
			array(
				'type' => Elementor\Controls_Manager::SWITCHER,
				'label' => esc_html__( 'Enable Columns Alignment Fix', 'columns-alignment-fix-for-elementor' ),
				'description' => esc_html__( 'It will remove the "weird" columns gap added by Elementor on the left and right side of each section (when `Columns Gap` is active). This helps you to have consistent content width without having to manually readjust it everytime you create sections with `Columns Gap`', 'columns-alignment-fix-for-elementor' ),
				'return_value' => 'enabled',
				'separator' => 'before',
				'prefix_class' => 'elementor-columns-alignment-fix-',
			)
		);
	}

	/**
	 * Enqueue custom CSS for columns alignment fix.
	 */
	public function add_css() {
		$container = get_option( 'elementor_stretched_section_container', 'body' );
		if ( empty( $container ) ) {
			$container = 'body';
		}

		$css =
$container . ' { overflow-x: hidden; }
.elementor-section.elementor-columns-alignment-fix-enabled > .elementor-column-gap-default > .elementor-row { width: calc(100% + 20px); margin-left: -10px; margin-right: -10px; }
.elementor-section.elementor-columns-alignment-fix-enabled > .elementor-column-gap-narrow > .elementor-row { width: calc(100% + 10px); margin-left: -5px; margin-right: -5px; }
.elementor-section.elementor-columns-alignment-fix-enabled > .elementor-column-gap-extended > .elementor-row { width: calc(100% + 30px); margin-left: -15px; margin-right: -15px; }
.elementor-section.elementor-columns-alignment-fix-enabled > .elementor-column-gap-wide > .elementor-row { width: calc(100% + 40px); margin-left: -20px; margin-right: -20px; }
.elementor-section.elementor-columns-alignment-fix-enabled > .elementor-column-gap-wider > .elementor-row { width: calc(100% + 60px); margin-left: -30px; margin-right: -30px; }'
;
		wp_add_inline_style( 'elementor-frontend', $css );
	}
}

// Initialize plugin.
Columns_Alignment_Fix_For_Elementor::instance();