;(function ($) {
    $.fn.jquerySelect = function (options) {
        var defaults = {
            "isFilter": true,
            "inputTip": "请点击...",
            "filterTip": "请输入...",
            "width":"200px",
            "onSelected":function(){}
        }
        var myOptions = $.extend(defaults, options);
        var $this = this;
        $this.hide();
        var html = '<div class="jquery-select-container"><div>' +
            '<input type="text" class="jquery-select-input" placeholder="{inputTip}" readonly="readonly" style="width: {width}">' +
            '<span class="jquery-select-arrow"><b></b></span></div>' +
            '<div class="jquery-select-data">' +
            '<input type="text" class="jquery-select-filter" placeholder="{filterTip}">' +
            '<ul class="jquery-select-data-ul">{li}</ul></div></div>'
        var li = '';
        var $option = this.find("option");
        $option.each(function () {
            li += '<li item-val="' + $(this).val() + '">' + $(this).text() + '</li>';
        })
        for(var option in defaults){
            html = html.replace("\{"+option+"\}",myOptions[option]);
        }
        html = html.replace('\{li\}', li);
        this.wrap(html);
        var $jquerySelectContainer = this.parents(".jquery-select-container");
        if (!myOptions.isFilter) {
            $jquerySelectContainer.find(".jquery-select-filter").hide();
        }
        //设置样式
        var $jquerySelectInput = $jquerySelectContainer.find(".jquery-select-input");
        var inputWidth = $jquerySelectInput.width();
        $jquerySelectContainer.find(".jquery-select-arrow").css({"left":(inputWidth-25)});
        //选中某项后将值设置到select中并将显示内容显示到input框中,隐藏插件
        $jquerySelectContainer.find(".jquery-select-data-ul>li").click(function () {
            var val = $(this).attr("item-val");
            $jquerySelectContainer.find(".jquery-select-input").val($(this).text());
            $this.find("option").each(function () {
                if ($(this).val() == val) {
                    $(this).prop("selected", true);
                    return false;
                }
            })
            $jquerySelectContainer.find(".jquery-select-data").hide(200);
            myOptions.onSelected();
        })
        domBind($jquerySelectContainer);
        return this.each(function () {
        });
    };

    //对插件内元素设置绑定事件
    var domBind = function ($jquerySelectContainer) {
        //input框点击弹出下拉列表
        $jquerySelectContainer.find(".jquery-select-input").click(function () {
            $jquerySelectContainer.find(".jquery-select-data").show(200).find(".jquery-select-filter").focus();
        });
        //点击插件区域外隐藏下拉列表
        $(document).mouseup(function (e) {
            var _con = $jquerySelectContainer;   // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $jquerySelectContainer.find(".jquery-select-data").hide(200);
            }
        });
        //筛选功能
        $jquerySelectContainer.find(".jquery-select-filter").keyup(function () {
            var text = $(this).val();
            var $li = $jquerySelectContainer.find(".jquery-select-data-ul>li");
            if (text.length == 0) {
                $li.show();
            } else {
                $li.hide().siblings(":contains('" + text + "')").show();
            }
        });
    }
})(jQuery);