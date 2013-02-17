<?php
/**
 * @var modX $modx
 * @var array $scriptProperties
 */
$plugins = array();

$plugins[0] = $modx->newObject('modPlugin');
$plugins[0]->set('id', 1);
$plugins[0]->set('name', 'CheckboxSortable');
$plugins[0]->set('description', 'Plugin to handle CheckboxSortable TV type.');
$plugins[0]->set('plugincode', getSnippetContent($sources['elements'] . 'plugins/checkboxsortable.php'));

$events = include $sources['data'] . 'events/checkboxsortable.php';
if (is_array($events) && !empty($events)) {
    $plugins[0]->addMany($events);
    $modx->log(xPDO::LOG_LEVEL_INFO, 'Packaged in '.count($events).' Plugin Events for CheckboxSortable.');
    flush();
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR, 'Could not find plugin events for CheckboxSortable!');
}
unset($events);

return $plugins;