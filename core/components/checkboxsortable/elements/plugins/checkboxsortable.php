<?php
/**
 * @var modX $modx
 * @var array $scriptProperties
 */

$corePath = $modx->getOption('checkboxsortable.core_path', null, $modx->getOption('core_path') . 'components/checkboxsortable/');
switch ($modx->event->name) {
    case 'OnTVInputRenderList':
        $modx->event->output($corePath. 'elements/tv/input/');
        break;

//    case 'OnTVOutputRenderList':
//        $modx->event->output($corePath. 'elements/tv/output/');
//        break;

    case 'OnDocFormPrerender':
        $modx->controller->addHtml('<script type="text/javascript">
    Ext.applyIf(MODx.lang, '. $modx->toJSON($modx->lexicon->loadCache('checkboxsortable', 'default')) .');
</script>');
        $modx->regClientStartupScript($modx->getOption('checkboxsortable.assets_url') . 'js/mgr/asides.js');
        $modx->regClientStartupScript($modx->getOption('checkboxsortable.assets_url') . 'js/mgr/tv/asides.tv.js');
        break;
}
return;
