<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://digitaleasyllc.com
 * @since      1.0.0
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Easy_Editor
 * @subpackage Easy_Editor/includes
 * @author     Chad Charles <chad@digitaleasyllc.com>
 */
class Easy_Editor_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {

		//IMPORTANT TODO MOVE THIS TO UNINSTALL.PHP
		self::remove_website_manager_role();
		self::remove_todo_capabilities_from_admin();

	}

	private static function remove_website_manager_role()
	{
		remove_role('website_manager');
	}
	private static function remove_todo_capabilities_from_admin()
	{
		$admin = get_role('administrator');
		$admin->remove_cap('edit_todos');
		$admin->remove_cap('publish_todos');
		$admin->remove_cap('delete_todos');
		$admin->remove_cap('edit_others_todos');
		$admin->remove_cap('delete_others_todos');
		$admin->remove_cap('read_private_todos');
		$admin->remove_cap('edit_published_todos');
		$admin->remove_cap('delete_published_todos');
		$admin->remove_cap('edit_private_todos');
		$admin->remove_cap('delete_private_todos');
	}

}
