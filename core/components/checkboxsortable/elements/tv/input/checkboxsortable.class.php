<?php
class modTemplateVarInputRenderCheckboxSortable extends modTemplateVarInputRender
{
    public function getTemplate()
    {
        return $this->modx->getOption('checkboxsortable.core_path', null, $this->modx->getOption('core_path') . 'components/checkboxsortable/') . 'elements/tv/input/tpl/checkboxsortable.tpl';
    }

    public function process($value, array $params = array())
    {
        $default = explode('||', $this->tv->default_text); // all standard values
        $value = trim($value);
        $value = empty($value) ? $default : explode('||', $value); // current saved values or default

        $inputOptions = $this->prepareRecords();

        $options = array();
        if (!empty($value[0]) && count($value) > 0){
            foreach ($value as $itemValue){
                $option = $inputOptions[$itemValue];
                $option['checked'] = true;
                $options[] = $option;
                unset($inputOptions[$itemValue]);
            }
        }

        $options = count($options) > 0 ? array_merge($options, $inputOptions) : $inputOptions;

        $this->setPlaceholder('opts', $options);
    }

    /**
     * Prepares the default input options to be usable within the grid store
     *
     * @return array The store array
     */
    public function prepareRecords()
    {
        $options = $this->getInputOptions();

        $inputOptions = array();
        foreach ($options as $inputOption){
            $inputopt_array = (is_array($inputOption)) ? $inputOption : explode('==', $inputOption);
            $option['value'] = isset($inputopt_array[1]) ? $inputopt_array[1] : $inputopt_array[0];
            $option['text'] = htmlspecialchars($inputopt_array[0], ENT_COMPAT, $this->modx->getOption('modx_charset'));
            $option['checked'] = false;
            $inputOptions[$option['value']] = $option;
        }

        return $inputOptions;
    }
}

return 'modTemplateVarInputRenderCheckboxSortable';