$(function(){
    var page=1;
    var pageSize=5;
    render();
$('.btn_add').on('click',function(){
    $('#addModal').modal('show');
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            // console.log(info)
            var html=template('tpl1',info);
            $('.dropdown-menu').html(html)
        }
    })
})

// 点击赋值给分类
$('.dropdown-menu').on('click','a',function(){

    var text= $(this).text();
    $('.dropdown-text').text(text);
    // 获取a标签上id
    var id=$(this).data('id');
    // 吧id 赋值给inputcategoryid上
    $("[name='categoryId']").val(id);
//    修改选择框的效验状态
$("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
})

// 上传图片
$("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
        // console.log(data);
        // 获取图片地址
        var url=data.result.picAddr;
    //    图片赋值给img
        $('.img_box img').attr('src',url);
        // 地址赋值给input隐藏框
        $("[name='brandLogo']").val(url);
        // 当成功的时候改变效验的状态
        $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
});


// 进行表单效验
$("form").bootstrapValidator({
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类的名字不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张品牌的图片'
          }
        }
      }

    },
    //配置不做校验的类型
    excluded: [],
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

//   表单效验成功之后的事件
$("form").on("success.form.bv", function(e){
    e.preventDefault();
   $.ajax({
       type:'post',
       url:'/category/addSecondCategory',
       data:$('form').serialize(),
       success:function(info){
           console.log(info)
           if(info.success){
            $('#addModal').modal('hide');
            page=1;
            render();
         //    重置表单
         $('form').data('bootstrapValidator').resetForm(true);
        //  重新修改分类内容
        $(".dropdown-text").text("请选择一级分类");
        // 修改图片的地址
        $('.img_box img').attr('src',"images/none.png");
           }

       }
   })
})

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info){
                // console.log(info)
                var html=template('tpl',info);
                $('tbody').html(html);
                // 分页插件
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