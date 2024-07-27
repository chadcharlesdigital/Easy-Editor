<?php
class Easy_Editor_Tasks
{

    public function __construct()
    {
        add_action('init', array($this, 'register_custom_post_type'));
    }

    public function register_custom_post_type()
    {
        $labels = array(
            'name' => _x('Tasks', 'Post Type General Name', 'easy-editor'),
            'singular_name' => _x('Task', 'Post Type Singular Name', 'easy-editor'),
            'add_new' => _x('New Task', 'Task', 'easy-editor'), // Added
            'add_new_item' => __('New Task', 'easy-editor'), // Added
            'edit_item' => __('Edit Task', 'easy-editor'),
            'new_item' => __('New Task', 'easy-editor'),
            'view_item' => __('View Task', 'easy-editor'),
            'view_items' => __('View Tasks', 'easy-editor'),
            'search_items' => __('Search Tasks', 'easy-editor'),
            'not_found' => __('No Tasks found', 'easy-editor'),
            'not_found_in_trash' => __('No Tasks found in Trash', 'easy-editor'),
            'parent_item_colon' => __('Parent Task:', 'easy-editor'),
            'all_items' => __('All Tasks', 'easy-editor'),
            'archives' => __('Task Archives', 'easy-editor'),
            'attributes' => __('Task Attributes', 'easy-editor'),
            // Additional labels can be added here
        );

        $args = array(
            'label' => __('Task', 'easy-editor'),
            'labels' => $labels,
            'supports' => array('title', 'editor', 'thumbnail', 'revisions', 'custom-fields'),
            'hierarchical' => false,
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-list-view',
            'show_in_admin_bar' => true,
            'show_in_nav_menus' => true,
            'show_in_rest' => true,
            'can_export' => true,
            'has_archive' => true,
            'exclude_from_search' => false,
            'publicly_queryable' => true,
            'capability_type' => 'task',
            // Additional arguments can be added here
        );

        register_post_type('task', $args);
    }
}
$tasks = new Easy_Editor_Tasks();