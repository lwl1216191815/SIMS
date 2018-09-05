/**
 * 定义弹出窗口
 */
Ext.define('SIMS.StudentWin', {
    extend: 'Ext.window.Window',
    title: '添加学生的窗口',
    height: 500,
    width: 550,
    layout: 'fit',
    closeAction: 'hide',
    closable: true,
    border: 10,
    modal: true,
    contextPath: '',

    initComponent: function () {
        var me = this;
        me.formItems = [
            {
                xtype: 'textfield',
                allowBlank: false,
                length: 100,
                fieldLabel: '学生姓名',
                name: 'name'
            },
            {
                xtype: 'radiogroup',
                allowBlank: false,
                fieldLabel: '性别',
                width: 100,
                items: [
                    {
                        name: 'sex',
                        inputValue: '0',
                        boxLabel: '男',
                        checked: true
                    }, {
                        name: 'sex',
                        inputValue: '1',
                        boxLabel: '女'
                    }
                ]
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                length: 100,
                fieldLabel: '备注',
                name: 'remark'
            }
        ];
        this.callParent(arguments);
        /**
         * 创建form表单
         */
        me.form = Ext.create('Ext.form.Panel', {
            autoScroll: true,
            region: 'center',
            border: 0,
            borderPadding: 5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: 'padding:5px 5px',
            defaults: {
                labelWidth: 85,
                labelAlign: 'right',
                margin: '5 5'
            },
            items: me.formItems
        });
        Ext.apply(this, {
            items: [me.form],
            buttons: [
                {
                    id: 'studentSubmit',
                    text: '确定',
                    /**
                     * 确定按钮被点击之后的处理函数
                     */
                    handler: function () {
                        if (!me.form.getForm().isValid()) {
                            return;
                        }
                        var param = me.form.getForm().getValues();
                        var url = me.contextPath + 'student/saveStudent.action';
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            waitMsg: '正在保存',
                            params: {
                                json: Ext.JSON.encode(param)
                            },
                            success: function () {
                                Ext.Msg.alert("提示", "增加成功");
                                me.hide();
                            },
                            failure: function () {
                                Ext.Msg.alert("提示", "增加失败");
                            }
                        });

                    }
                },
                {
                    id: 'close',
                    text: '关闭',
                    handler: function () {
                        me.hide();
                    }
                }
            ]
        });
        this.callParent(arguments);
    },
});