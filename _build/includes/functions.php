<?php
/**
 * Required functions to build the transport package
 *
 * @subpackage build
 */

/**
 * @param string $filename
 * @return string
 */
function getSnippetContent($filename)
{
    $o = file_get_contents($filename);
    $o = str_replace('<?php', '', $o);
    $o = str_replace('?>', '', $o);
    $o = trim($o);
    return $o;
}