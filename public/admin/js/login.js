$(function(){
    // 先进行表单验证
    $form=$('form')
    $form.bootstrapValidator({
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
          username: {
            validators: {
              //不能为空
              notEmpty: {
                message: '用户名不能为空'
              },
              callback:{
                  message:'用户名错误'
              },
              //长度校验
              stringLength: {
                min: 3,
                max: 8,
                message: '用户名长度必须在3到8之间'
              },
              //正则校验
              regexp: {
                regexp: /^[a-zA-Z0-9_\.]+$/,
                message: '用户名由数字字母下划线和.组成'
              }
            }
          },
          password: {
            validators: {
              //不能为空
              notEmpty: {
                message: '密码不能为空'
              },
              callback:{
                message:'密码错误'
            },
              //长度校验
              stringLength: {
                min: 6,
                max: 30,
                message: '用户名长度必须在6到30之间'
              },

            }
          },
        }
      
      });
    //   提交
      $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data: $form.serialize(),
            success:function(info){
                console.log(info)
                if(info.success){
                    location.href='index.html';
                    
                };
                if(info.error==1000){
                    $form.data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
                }
                if(info.error==1001){
                    $form.data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
                }
            }
        })
    });
 //重置功能，重置样式
 $("[type='reset']").on('click',function(){
     $form.data('bootstrapValidator').resetForm();
 })
})