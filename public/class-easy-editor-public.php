<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://digitaleasyllc.com
 * @since      1.0.0
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/public
 * @author     Chad Charles <chad@digitaleasyllc.com>
 */
class Easy_Editor_Public
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Easy_Editor_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Easy_Editor_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . '../build/index.css', array(), $this->version, 'all');

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Easy_Editor_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Easy_Editor_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/easy-editor-public.js', array('jquery'), $this->version, false);
		wp_enqueue_script('font-awesome-6', 'https://kit.fontawesome.com/f3d72fc7e6.js' );
		// scripts enqueued if the user is logged in and has the capability to edit todos
		if (is_user_logged_in() && Easy_Editor_Helper::check_user_capability_for_tasks('u') && !is_admin()) {
			// Get the current page ID 
			$current_page_id = get_the_ID();
			wp_enqueue_script('easy-editor-react', plugin_dir_url(__FILE__) . "../build/index.js", array( 'wp-element', 'wp-api' ), '1.0', true);
			// Localize the script with new data
			$script_data = array(
				'current_page_id' => $current_page_id,
				'ajax_url' => admin_url('admin-ajax.php'),
				'nonce' => wp_create_nonce('easy_editor_nonce')
			);
			wp_localize_script('easy-editor-react', 'easy_editor_data', $script_data);
		}
	}

	public function generate_sidebar()
	{
		if ( Easy_Editor_Helper::should_editor_be_active() ) {
			//load the sidebar template
			include_once plugin_dir_path(__FILE__) . 'partials/easy-editor-public-sidebar.php';
		}
	}
}
