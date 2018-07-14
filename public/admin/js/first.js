$(function(){
    var page=1;
    var pageSize=5;
    render();
    // 点击显示模态框
    $(".btn_add").on("click", function () {
        //2.1 显示模态框
        $("#addModal").modal('show');
    })
// 进行表单验证
$('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName:{
        validators: {
            notEmpty: {
              message: '一级分类的名称不能为空'
            }
          }
        }
    },
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
          }
  });

// 点击按钮发送数据然后渲染页面表单成功实践
$("form").on('success.form.bv', function (e) {
    // 阻止默认发送实践
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$("form").serialize(),
        success:function(info){
            console.log(info)
            if(info.success){
                // 模态框隐藏
                $("#addModal").modal('hide');
                render();
            }
        }
    })
});

    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info)
                var html=template('tpl',info);
                $('tbody').html(html);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                      page = p;
                      render();
                    }
                  });
            }
        })
    }
})