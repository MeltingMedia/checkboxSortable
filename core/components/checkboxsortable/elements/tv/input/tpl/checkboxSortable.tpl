<div id="tv{$tv->id}-checkboxsortable"></div>

<script type="text/javascript">
    // <![CDATA[
    {literal}
    Ext.onReady(function() {
        // Populate the grid store
        var store{/literal}{$tv->id}{literal} = new Ext.data.Store({
            autoDestroy: true
            ,reader: new Ext.data.ArrayReader({}, [
                 {name: 'id'}
                ,{name: 'name'}
                ,{name: 'value'}
                ,{name: 'label'}
                ,{name: 'checked'}
                //,{name: 'test'}
            ])
            ,data: [{/literal}
                {foreach from=$opts item=item key=k name=checkboxsortable}
                    {literal}[{/literal}
                     'tv{$tv->id}-{$k}'
                    ,'tv{$tv->id}[]'
                    ,'{$item.value}'
                    ,'{$item.text|escape:"javascript"}'
                    ,{if $item.checked}true{else}false{/if}
                    //,'<center><input id="tv{$tv->id}-{$k}" type="checkbox" value="{$item.value}" name="tv{$tv->id}[]" {if $item.checked}checked{/if} /></center>'
                    {literal}],{/literal}
                {/foreach}
                {literal}]
        });

        var grid = new CheckboxSortable.TV({
            store: store{/literal}{$tv->id}{literal}
            ,renderTo: {/literal}'tv{$tv->id}-checkboxsortable'{literal}
            ,autoPlace: {/literal}{if $params.autoplace}true{else}false{/if}{literal}
        });

        // Dirty work around to resize the grid
        var tabs = Ext.getCmp('modx-resource-tabs');
        tabs.on('tabChange', function(elem, tab) {
        {/literal}
            {if $params.tab_ids}
                var array = '{$params.tab_ids}'.split(',');
                Ext.each(array, function(item, idx, list) {
                    list[idx] = item.trim();
                });
                if (array.indexOf(tab.id) != -1) {
                    grid.refreshView();
                }
            {else}
                // Default TV panel
                if (tab.id == 'modx-panel-resource-tv') {
                    grid.refreshView();
                }
            {/if}
        {literal}
            if (tab.id == '{/literal}{$params.tab_ids}{literal}') {
                grid.refreshView();
            }
        });
        tabs.on('resize', function() {
            grid.refreshView();
        });
    });
    {/literal}
    // ]]>
</script>