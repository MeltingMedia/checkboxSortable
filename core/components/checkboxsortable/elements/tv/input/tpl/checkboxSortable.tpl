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
            ])
            ,data: [{/literal}
                {foreach from=$opts item=item key=k name=checkboxsortable}
                    {literal}[{/literal}
                     'tv{$tv->id}-{$k}'
                    ,'tv{$tv->id}[]'
                    ,'{$item.value}'
                    ,'{$item.label|escape:"javascript"}'
                    ,{if $item.checked}true{else}false{/if}
                    {literal}],{/literal}
                {/foreach}
                {literal}]
        });

        var grid = new CheckboxSortable.TV({
            store: store{/literal}{$tv->id}{literal}
            ,renderTo: {/literal}'tv{$tv->id}-checkboxsortable'{literal}
            ,autoPlace: {/literal}{$params.autoplace}{literal}
        });

        // Dirty work around to resize the grid
        if (MODx.config.tvs_below_content == 1) {
            var panel = Ext.getCmp('modx-panel-resource-tv');
            panel.on('afterlayout', function() {
                grid.refreshView();
            });
        } else {
            var tabs = Ext.getCmp('modx-resource-tabs');
            tabs.on('tabChange', function(elem, tab) {
                {/literal}
                var array = '{$params.tab_ids}'.split(',');
                Ext.each(array, function(item, idx, list) {
                    list[idx] = item.trim();
                });
                array.push('modx-panel-resource-tv');
                if (array.indexOf(tab.id) != -1) {
                    grid.refreshView();
                }
                {literal}
                if (tab.id == '{/literal}{$params.tab_ids}{literal}') {
                    grid.refreshView();
                }
            });
            tabs.on('resize', function() {
                grid.refreshView();
            });
        }
    });
    {/literal}
    // ]]>
</script>
