<?php
/**
 * @var modX $modx
 */

$corePath = $modx->getOption('checkboxsortable.core_path', null, $modx->getOption('core_path') . 'components/checkboxsortable/');
return $modx->controller->fetchTemplate($corePath . 'elements/tv/properties/tpl/checkboxsortable.tpl');