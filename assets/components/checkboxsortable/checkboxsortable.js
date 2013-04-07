Ext.ns('CheckboxSortable');

CheckboxSortable.TV =  function(config) {
    config = config || {};

    Ext.applyIf(config, {
        columns: [{
            id: 'label'
            ,header: _('checkboxsortable.column_name')
            ,dataIndex: 'label'
        },{
            id: 'checked'
            ,header: _('checkboxsortable.column_active')
            ,dataIndex: 'checked'
            ,width: 80
            ,fixed: true
            ,renderer: this.renderCheckbox
        }]
        ,autoPlace: !(config.tvParams['autoplace'] == 0 || config.tvParams['autoplace'] == 'false')
        ,viewConfig: {
            enableRowBody: true
            ,headersDisabled: true
            ,forceFit: true
            ,scrollOffset: 0
        }
        ,autoHeight: true
        ,stripeRows: true
        ,enableDragDrop: true
        ,ddGroup: 'checkboxsortableGroup'
        ,ddText: _('checkboxsortable.entry_sort')
        ,enableHdMenu: false
        ,enableColumnMove: false
        ,enableColumnResize: false
        ,enableColumnHide: false

        ,listeners: {
            rowClick: {
                fn: function(grid, rowIdx, e) {
                    var store = this.getStore()
                        ,row = store.getAt(rowIdx)
                        ,checked = !row.data.checked;

                    row.set('checked', checked);

                    if (this.autoPlace) {
                        var firstUnchecked = store.find('checked', false);
                        if (checked) {
                            if (firstUnchecked == 0) {
                                // First entry checked
                                this.placeAt(0);
                            } else if (firstUnchecked == (rowIdx + 1) || firstUnchecked < 0) {
                                // Stay at the current place
                                this.placeAt(rowIdx);
                            } else {
                                // Place before the first unchecked entry
                                this.placeAt(firstUnchecked);
                            }
                        } else {
                            if (firstUnchecked >= 0) {
                                // Place at the bottom
                                var last = store.getCount() - 1;
                                this.placeAt(last);
                            }
                        }
                    } else {
                        MODx.fireResourceFormChange();
                        this.getStore().commitChanges();
                    }
                }
                ,scope: this
            }
            ,afterrender: function() {
                this.listenForResize();
            }
        }
    });
    CheckboxSortable.TV.superclass.constructor.call(this, config);

    new Ext.dd.DropTarget(this.getView().mainBody, {
        ddGroup: 'checkboxsortableGroup'
        ,notifyDrop: function(source, e, data) {
            var sm = source.grid.getSelectionModel()
                ,rows = sm.getSelections()
                ,cindex = source.getDragData(e).rowIndex
                ,store = source.grid.getStore();

            if (sm.hasSelection()) {
                for (i = 0; i < rows.length; i ++) {
                    store.remove(store.getById(rows[i].id));
                    store.insert(cindex, rows[i]);
                }
                sm.selectRecords(rows);
            }
            MODx.fireResourceFormChange();
        }
    });
};

Ext.extend(CheckboxSortable.TV, Ext.grid.GridPanel, {
    refreshView: function() {
        this.getView().refresh();
    }

    ,renderCheckbox: function(v, meta, rec, rowIdx, colIdx, store, view) {
        var data = rec.data;
        return '<div style="text-align: center"><input type="checkbox" value="'+ data.value +'" '+ (v ? "checked" : "") +' name="'+ data.name +'" /></div>'
    }

    ,placeAt: function(index) {
        var sm = this.getSelectionModel();
        var rows = sm.getSelections();
        var store = this.getStore();

        if (sm.hasSelection()) {
            for (i = 0; i < rows.length; i ++) {
                store.remove(store.getById(rows[i].id));
                store.insert(index, rows[i]);
            }
            sm.selectRecords(rows);
        }

        MODx.fireResourceFormChange();
        this.getStore().commitChanges();
    }




    /**
     * Defer the execution of listeners
     * @private
     */
    ,_setResizeListener: function() {
        Ext.defer(this.listenForResize, 10, this);
    }

    /**
     * Check if an element with the given CSS class exists in the given component
     * @private
     */
    ,_isChildren: function(cmp, css) {
        return (cmp.el.query('.'+css).length > 0);
    }

    /**
     * Add a listener to the given component, for the given event
     * @private
     */
    ,_listenFor: function(id, tabPanel, events) {
        var cmp = Ext.getCmp(id);
        if (cmp) {
            Ext.each(events, function(event, idx, array) {
                cmp.on(event, function() {
                    if (this._isChildren(tabPanel.getActiveTab(), this.container.id)) {
                        this.refreshView();
                    }
                }, this);
            }, this);
        }
    }

    /**
     * Take care fo form customization
     * @private
     */
    ,_listenForCustomTabs: function(hTabs, events) {
        Ext.each(events, function(event, idx, array) {
            hTabs.on(event, function(panel) {
                var activeTab = panel.getActiveTab();
                // Only when active tab is not the default TV tab & if the TV is in the active
                if (activeTab.id != 'modx-panel-resource-tv' && this._isChildren(activeTab, this.container.id)) {
                    this.refreshView();
                }
            }, this);
        }, this);
    }

    /**
     * Add some listeners to resize the TV content when appropriate
     */
    ,listenForResize: function() {
        var vTabs = Ext.getCmp('modx-resource-vtabs');
        if (vTabs) {
            this.refreshView();
            vTabs.on('tabChange', function(panel, tab) {
                if (this._isChildren(tab, this.container.id)) {
                    this.refreshView();
                }
            }, this);
        } else {
            // Schedule a retry in a few ms
            return this._setResizeListener();
        }

        // Take care of Form Customization if any
        var hTabs = Ext.getCmp('modx-resource-tabs');
        if (hTabs) {
            this._listenForCustomTabs(hTabs, ['tabChange', 'resize']);
        }

        if (MODx.config.tvs_below_content != 1) {
            // TVs are within the "default" tabs
            this._listenFor('modx-resource-tabs', vTabs, ['resize']);
        } else {
            // TVs are below the content
            this._listenFor('modx-panel-resource-tv', vTabs, ['afterlayout']);
        }
    }
});
Ext.reg('checkboxsortable-grid', CheckboxSortable.TV);
