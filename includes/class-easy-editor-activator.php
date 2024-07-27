<?php

/**
 * Fired during plugin activation
 *
 * @link       https://digitaleasyllc.com
 * @since      1.0.0
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Easy_Editor
 * @subpackage Easy_Editor/includes
 * @author     Chad Charles <chad@digitaleasyllc.com>
 */
class Easy_Editor_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{
		self::register_website_manager_role();
		self::add_task_capabilities_to_admin();
		flush_rewrite_rules();
	}

	private static function register_website_manager_role()
	{
		add_role(
			'website_manager', // System name of the role.
			__('Website Manager', 'easy-editor'), // Display name of the role using the 'easy-editor' text domain.
			array(
				// Basic capability to read the dashboard
				'read' => true,

				// Capabilities for 'Todos' custom post type, utilizing 'task' capabilities
				'edit_tasks' => true,
				'publish_tasks' => true,
				'delete_tasks' => true,
				'edit_others_tasks' => true,
				'delete_others_tasks' => true,
				'read_private_tasks' => true,
				'edit_published_tasks' => true,
				'delete_published_tasks' => true,
				'edit_private_tasks' => true,
				'delete_private_tasks' => true,


				// Since 'capability_type' is 'post', standard post capabilities apply.
				// Explicitly deny capabilities not related to managing 'Todos'
				'edit_posts' => false,
				'publish_posts' => false,
				'edit_others_posts' => false,
				'delete_others_posts' => false,
				'read_private_posts' => false,
				'edit_published_posts' => false,
				'delete_published_posts' => false,
				'edit_private_posts' => false,
				'delete_private_posts' => false,
				'edit_pages' => false,
				'publish_pages' => false,
				'edit_others_pages' => false,
				'delete_others_pages' => false,
				'read_private_pages' => false,
				'edit_published_pages' => false,
				'delete_published_pages' => false,
				'edit_private_pages' => false,
				'delete_private_pages' => false,
				'manage_categories' => false,
				'manage_links' => false,
				'moderate_comments' => false,
				'manage_options' => false,
				'activate_plugins' => false,
				'edit_plugins' => false,
				'edit_theme_options' => false,
				'export' => false,
				'import' => false,
				'list_users' => false,
				'manage_woocommerce' => false,
				'view_woocommerce_reports' => false,
				// Specify false for any other capabilities related to 'pages', 'posts', 'plugins', or 'site settings' as needed
			)
		);
	}

	private static function add_task_capabilities_to_admin() {
		// Get the administrator role object
		$admin_role = get_role('administrator');
	
		// Check if the role exists
		if (!is_null($admin_role)) {
			// Add custom capabilities related to 'Todo' CPT
			$admin_role->add_cap('edit_task');
            $admin_role->add_cap('read_task');
            $admin_role->add_cap('delete_task');
            $admin_role->add_cap('edit_tasks');
            $admin_role->add_cap('edit_others_tasks');
            $admin_role->add_cap('publish_tasks');
            $admin_role->add_cap('read_private_tasks');
            $admin_role->add_cap('delete_tasks');
            $admin_role->add_cap('delete_private_tasks');
            $admin_role->add_cap('delete_published_tasks');
            $admin_role->add_cap('delete_others_tasks');
            $admin_role->add_cap('edit_private_tasks');
            $admin_role->add_cap('edit_published_tasks');
			// Repeat for any other 'Todo' capabilities you need to add
		}
	}
	


}
