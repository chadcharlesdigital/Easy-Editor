<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://digitaleasyllc.com
 * @since      1.0.0
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Easy_Editor
 * @subpackage Easy_Editor/admin
 * @author     Chad Charles <chad@digitaleasyllc.com>
 */
class Easy_Editor_Admin
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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/easy-editor-admin.css', array(), $this->version, 'all');

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/easy-editor-admin.js', array('jquery'), $this->version, false);

	}

	/*
	 * Add the Easy Editor admin toolbar items if the user has the 
	 * capability to edit todos and the user isn't on an admin page
	 *
	 * @since    1.0.0
	 */
	public function add_admin_toolbar_items($wp_admin_bar)
	{
		if (Easy_Editor_Helper::check_user_capability_for_tasks('c') && !is_admin()) {
			// Add the parent item
			$wp_admin_bar->add_node(
				array(
					'id' => 'easy-editor',
					'title' => '<span class="on-off-light">Easy Editor</span>',
					'href' => '#',

				)
			);

			// Add the first submenu item - Enable Todos
			$wp_admin_bar->add_node(
				array(
					'parent' => 'easy-editor',
					'id' => 'enable-todos',
					'title' => 'Enable Todos',
					'href' => "#", // Adjust the link as necessary
					'meta' => [
						'class' => 'ee-sidebar-toggle',
					]
				)
			);

			// Add the second submenu item - Pending Todos
			$wp_admin_bar->add_node(
				array(
					'parent' => 'easy-editor',
					'id' => 'pending-todos',
					'title' => 'Pending Todos',
					'href' => "#", // Adjust the link as necessary
				)
			);
		}
	}

	public function easy_editor_create_new_task()
	{
		// Check nonce for security
		if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'easy_editor_nonce')) {
			wp_send_json(array('success' => false, 'message' => 'Invalid nonce.'));
			exit;
		}
		// Sanitize and retrieve form fields
		$description = isset($_POST['task-description']) ? sanitize_text_field($_POST['task-description']) : '';
		$file_upload = isset($_FILES['file-upload']['name']) && !empty($_FILES['file-upload']['name']) ? $_FILES['file-upload'] : '';
		$targetElement = isset($_POST['target-element']) ? sanitize_text_field($_POST['target-element']) : '';
		$screenSize = isset($_POST['screen-size']) ? sanitize_text_field($_POST['screen-size']) : '';
		$url = isset($_POST['url']) ? sanitize_text_field($_POST['url']) : '';
		$userAgent = isset($_POST['user-agent']) ? sanitize_text_field($_POST['user-agent']) : '';



		// further validation
		if (empty($description)) {
			wp_send_json(array('success' => false, 'message' => 'Description is required.'));
			exit;
		}

		// This field is optional so if it isn't empty we validate it and if theres an error we return that
		if (isset($file_upload['name']) && !empty($file_upload['name']) && $file_upload_errors = Easy_Editor_Helper::file_is_invalid($file_upload)) {
			wp_send_json(array('success' => false, 'message' => $file_upload_errors));
			exit;
		}


		//ok the file is valid lets upload it to the wp media library
		if (isset($file_upload['name']) && !empty($file_upload['name'])) {

			if (!function_exists('wp_handle_upload')) {
				require_once (ABSPATH . 'wp-admin/includes/file.php');
				require_once (ABSPATH . 'wp-admin/includes/media.php');
				require_once (ABSPATH . 'wp-admin/includes/image.php');
			}

			$wp_media = wp_handle_upload($file_upload, array('test_form' => false));

			if ($wp_media && !isset($wp_media['error'])) {
				// File is successfully uploaded, now insert it into the media library
				$file_path = $wp_media['file'];
				$file_url = $wp_media['url'];
				$file_type = $wp_media['type'];
				$file_name = basename($file_path);

				$attachment = array(
					'guid' => $file_url,
					'post_mime_type' => $file_type,
					'post_title' => sanitize_file_name($file_name),
					'post_content' => '',
					'post_status' => 'inherit'
				);

				$attachment_id = wp_insert_attachment($attachment, $file_path);

				if (!is_wp_error($attachment_id)) {
					// Generate the metadata for the attachment and update the database record
					$attachment_data = wp_generate_attachment_metadata($attachment_id, $file_path);
					wp_update_attachment_metadata($attachment_id, $attachment_data);
					$file_upload_id = $attachment_id;
				} else {
					wp_send_json(array('success' => false, 'message' => 'Failed to insert attachment.'));
					exit;
				}
			} else {
				/*
				 * Error generated by _wp_handle_upload()
				 * @see _wp_handle_upload() in wp-admin/includes/file.php
				 */
				wp_send_json(array('success' => false, 'message' => $wp_media['error']));
				exit;
			}

		}

		//ok file is media library lets create a new task post type and populate it
		$task_post = array(
			'post_title' => 'New Task2',
			'post_content' => $description,
			'post_status' => 'publish',
			'post_type' => 'task',
		);

		$task_id = wp_insert_post($task_post);

		if ( $task_id ){
			// update_post_meta($post_id, '_task_body', $description);
		}

		// Prepare response data
		$response = array(
			'success' => true,
			'message' => 'Task Created Successfully'
		);

		// Send the response back to the client
		wp_send_json(array('success' => true, 'message' => "new task created " . $task_id));
		exit;
	}

}
