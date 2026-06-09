<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/storage-link', function () {
    try {
        $target = storage_path('app/public');
        
        // Default Laravel public path
        $shortcut = public_path('storage');
        
        // Shared hosting document root (e.g. public_html)
        $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? null;
        $docRootShortcut = $docRoot ? rtrim($docRoot, '/') . '/storage' : null;
        
        $output = "";
        
        if (!file_exists($shortcut)) {
            symlink($target, $shortcut);
            $output .= "Default symlink created at: {$shortcut}\n";
        } else {
            $output .= "Default symlink already exists.\n";
        }
        
        if ($docRootShortcut && !file_exists($docRootShortcut)) {
            if (symlink($target, $docRootShortcut)) {
                $output .= "Shared hosting symlink created at: {$docRootShortcut}\n";
            }
        } elseif ($docRootShortcut) {
            $output .= "Shared hosting symlink already exists at: {$docRootShortcut}\n";
        }
        
        return nl2br($output ?: "No actions taken.");
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});
