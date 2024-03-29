<?php
class Easy_Editor_Todos {

public function __construct() {
    add_action( 'init', array( $this, 'register_custom_post_type' ) );
}

public function register_custom_post_type() {
    $labels = array(
        'name'                  => _x( 'Todos', 'Post Type General Name', 'easy-editor' ),
        'singular_name'         => _x( 'Todo', 'Post Type Singular Name', 'easy-editor' ),
        'add_new'               => _x( 'New Todo', 'Todo', 'easy-editor' ), // Added
        'add_new_item'          => __( 'New Todo', 'easy-editor' ), // Added
        'edit_item'             => __( 'Edit Todo', 'easy-editor' ),
        'new_item'              => __( 'New Todo', 'easy-editor' ),
        'view_item'             => __( 'View Todo', 'easy-editor' ),
        'view_items'            => __( 'View Todos', 'easy-editor' ),
        'search_items'          => __( 'Search Todos', 'easy-editor' ),
        'not_found'             => __( 'No Todos found', 'easy-editor' ),
        'not_found_in_trash'    => __( 'No Todos found in Trash', 'easy-editor' ),
        'parent_item_colon'     => __( 'Parent Todo:', 'easy-editor' ),
        'all_items'             => __( 'All Todos', 'easy-editor' ),
        'archives'              => __( 'Todo Archives', 'easy-editor' ),
        'attributes'            => __( 'Todo Attributes', 'easy-editor' ),
        // Additional labels can be added here
    );

    $args = array(
        'label'                 => __( 'Todo', 'easy-editor' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'thumbnail', 'revisions', 'custom-fields' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-list-view',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'todo',
        // Additional arguments can be added here
    );

    register_post_type( 'todo', $args );
}
}
$todos = new Easy_Editor_Todos();