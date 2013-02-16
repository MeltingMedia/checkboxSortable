<?php
class modTemplateVarInputRenderCheckboxSortable extends modTemplateVarInputRender
{
    public $choices = array();

    public function getTemplate()
    {
        return $this->modx->getOption('checkboxsortable.core_path', null, $this->modx->getOption('core_path') . 'components/checkboxsortable/') . 'elements/tv/input/tpl/checkboxsortable.tpl';
    }

    public function process($value, array $params = array())
    {
        // Default value(s)
        $default = explode('||', $this->tv->default_text);
        $value = trim($value);
        // current saved values or default
        $values = empty($value) ? $default : explode('||', $value);

        $this->prepareRecords();

        $options = array();
        if (!empty($values[0]) && count($values) > 0) {
            foreach ($values as $itemValue) {
                // Make sure the value exists in the possible choices
                if ($this->isValidValue($itemValue) !== false) {
                    $option = $this->choices[$itemValue];
                    $option['checked'] = true;
                    $options[] = $option;
                }
                unset($this->choices[$itemValue]);
            }
        }

        $options = count($options) > 0 ? array_merge($options, $this->choices) : $this->choices;

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
        foreach ($options as $inputOption) {
            $inputopt_array = (is_array($inputOption)) ? $inputOption : explode('==', $inputOption);
            $option['value'] = isset($inputopt_array[1]) ? $inputopt_array[1] : $inputopt_array[0];
            $option['label'] = htmlspecialchars($inputopt_array[0], ENT_COMPAT, $this->modx->getOption('modx_charset'));
            $option['checked'] = false;
            $inputOptions[$option['value']] = $option;
        }

        $this->choices = $inputOptions;
    }

    public function isValidValue($value)
    {
        foreach ($this->choices as $idx => $entry) {
            if ($entry['value'] == $value) return true;
        }

        return false;

    }

    public function recursive_array_search($needle, array $haystack)
    {
        foreach ($haystack as $key => $value) {
            $current_key = $key;
            if ($needle === $value OR (is_array($value) && $this->recursive_array_search($needle, $value) !== false)) {
                return $current_key;
            }
        }

        return false;
    }
}

return 'modTemplateVarInputRenderCheckboxSortable';