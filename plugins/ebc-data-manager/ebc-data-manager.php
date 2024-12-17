<?php
/*
 *	Plugin Name: Elite Basketball Circuit Data Management Framework
 *	Description: Elite Basketball Circuit Data Management contains functionality to support Elite Basketball Circuit website.
 *	Version: 1.0
 *	Author: Daradona Dam
 */
function ebc_dir_render($sub_dir = null, $file_name, $player_id = null, $arg = null){
  $dir = 'inc/'.$sub_dir.'/'.$file_name.'.php';
  include($dir);
  $output_dir = ob_get_contents();
  return $output_dir;
}
function g365_fn($arg = null, $type = null){
  $fn_data = g365_conn( $arg['fn_name'], $arg['arguments'] );
  if(!empty($arg['decode'])){ $is_decoded = $arg['decode']; }else{ $is_decoded = ''; }
  if($is_decoded == true){
    $fn_data = json_decode(json_encode($fn_data), true);  
  }else{
    $fn_data = $fn_data;
  }
  return $fn_data;
}
