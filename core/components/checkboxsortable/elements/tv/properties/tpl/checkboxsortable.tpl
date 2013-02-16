<div id="checkboxsortable-tv-{$tv}"></div>
{literal}

<script type="text/javascript">
    // <![CDATA[
    Ext.onReady(function() {
        var params = {
            {/literal}{foreach from=$params key=k item=v name='p'}
            '{$k}': '{$v|escape:"javascript"}'{if NOT $smarty.foreach.p.last},{/if}
            {/foreach}{literal}
        };
        var oc = {
            change: {
                fn: function() {
                    Ext.getCmp('modx-panel-tv').markDirty();
                }
                ,scope: this
            }
        };

        MODx.load({
            xtype: 'panel'
            ,layout: 'form'
            ,autoHeight: true
            ,labelAlign: 'top'
            ,cls: 'form-with-labels'
            ,border: false
            ,items: [{
                xtype: 'textfield'
                ,fieldLabel: _('checkboxsortable.property_tab_id')
                ,description: MODx.expandHelp ? '' : _('checkboxsortable.property_tab_id_desc')
                ,name: 'inopt_tab_ids'
                ,id: 'inopt_tab_ids{/literal}{$tv}{literal}'
                ,value: params['tab_ids']
                ,listeners: oc
                ,anchor: '100%'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'inopt_tab_ids{/literal}{$tv}{literal}'
                ,html: _('checkboxsortable.property_tab_id_desc')
                ,cls: 'desc-under'
            },{
                xtype: 'combo-boolean'
                ,fieldLabel: _('checkboxsortable.property_autoplace')
                ,description: MODx.expandHelp ? '' : _('checkboxsortable.property_autoplace_desc')
                ,name: 'inopt_autoplace'
                ,hiddenName: 'inopt_autoplace'
                ,id: 'inopt_autoplace{/literal}{$tv}{literal}'
                ,value: !(params['autoplace'] == 0 || params['autoplace'] == 'false')
                ,width: false
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'inopt_autoplace{/literal}{$tv}{literal}'
                ,html: _('checkboxsortable.property_autoplace_desc')
                ,cls: 'desc-under'
            }]
            ,renderTo: 'checkboxsortable-tv-{/literal}{$tv}{literal}'
        });
    });
    // ]]>
</script>
{/literal}
