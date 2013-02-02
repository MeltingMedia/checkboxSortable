<?php
/**
 * Ensure that the paths are made writable so the files can be copied.
 *
 * @package checkboxsortable
 * @subpackage build
 */
$success = true;
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
            /** @var modX $modx */
            $modx =& $object->xpdo;

            $directories = array(
                $modx->getOption('core_path') . 'model/modx/processors/element/tv/renders/mgr/input/',
                $modx->getOption('manager_path') . 'templates/default/element/tv/renders/input/',
            );

            foreach ($directories as $dir) {
                @chmod($dir, 0775);
                if (!is_writable($dir)) {
                    $success = false;
                }
            }

            break;
        case xPDOTransport::ACTION_UPGRADE:
            break;
        case xPDOTransport::ACTION_UNINSTALL:
            break;
    }
}
return $success;