<?php 
//static class containing helper functions for plugin
class Easy_Editor_Helper {
    
    //function to check if logged in user has task capabilities
    public static function check_user_capability_for_tasks($capability_type) {
        switch ($capability_type) {
            case 'c': // Create
                return current_user_can('edit_tasks');
            case 'r': // Read
                // Assuming 'edit_tasks' allows reading in the admin context
                // Might need adjustment based on how your capabilities are set up
                return current_user_can('edit_tasks');
            case 'u': // Update
                return current_user_can('edit_published_tasks');
            case 'd': // Delete
                return current_user_can('delete_tasks');
            default:
                // If the provided capability type is not recognized, return false
                return false;
        }
    }

    public static function should_editor_be_active(){
        return is_user_logged_in() && Easy_Editor_Helper::check_user_capability_for_tasks('u') && !is_admin();
    }

    public static function generate_wysiwyg_editor($content){
        $settings = array(
            'textarea_name' => 'ee_new_task', // Name attribute of the <textarea> element
            'media_buttons' => true, // Show insert/upload media button
            'textarea_rows' => 10, // Set the number of rows in <textarea>
            'teeny'         => false, // Output the minimal editor config used in Press This
            'quicktags'     => true  // Show quicktags
            // Additional settings can be added here.
        );
        ob_start();
        wp_editor($content, 'easy-editor-task-content', $settings );
        $editor = ob_get_clean();
        return $editor;
    }

    //returns a string containing the error message if the file is invalid false if the file is fine
    public static function file_is_invalid( $file_name ){
        $file = $file_name['name'];
        $allowed_meme_types = get_allowed_mime_types();
        $file_info = wp_check_filetype_and_ext($file, $file, $allowed_meme_types);
        if( !$file_info['ext'] || !$file_info['type'] ){
            return "File type is not allowed";
        }

        if( $_FILES[$file_name]['size'] > wp_max_upload_size() ){
            return "File is too large";
        }
        return false;
    }
}