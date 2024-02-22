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
}