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
});
Ext.reg('checkboxsortable-grid', CheckboxSortable.TV);
