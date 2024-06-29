<?php 
//static class containing helper functions for plugin
class Easy_Editor_Helper {
    
    //function to check if logged in user has todo capabilities
    public static function check_user_capability_for_todos($capability_type) {
        switch ($capability_type) {
            case 'c': // Create
                return current_user_can('edit_todos');
            case 'r': // Read
                // Assuming 'edit_todos' allows reading in the admin context
                // Might need adjustment based on how your capabilities are set up
                return current_user_can('edit_todos');
            case 'u': // Update
                return current_user_can('edit_published_todos');
            case 'd': // Delete
                return current_user_can('delete_todos');
            default:
                // If the provided capability type is not recognized, return false
                return false;
        }
    }

    public static function should_editor_be_active(){
        return is_user_logged_in() && Easy_Editor_Helper::check_user_capability_for_todos('u') && !is_admin();
    }

    public static function generate_wysiwyg_editor($content){
        $settings = array(
            'textarea_name' => 'ee_new_todo', // Name attribute of the <textarea> element
            'media_buttons' => true, // Show insert/upload media button
            'textarea_rows' => 10, // Set the number of rows in <textarea>
            'teeny'         => false, // Output the minimal editor config used in Press This
            'quicktags'     => true  // Show quicktags
            // Additional settings can be added here.
        );
        ob_start();
        wp_editor($content, 'easy-editor-todo-content', $settings );
        $editor = ob_get_clean();
        return $editor;
    }
}