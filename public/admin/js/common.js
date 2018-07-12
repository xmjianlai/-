$(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    //完成进度条
    
      NProgress.done();
    
  });
//   判断是够登录过的如果登录过的直接跳转如果没有登录过的跳转到登录页


// 二级菜单的显示与隐藏
$(".second").prev().on("click", function () {
    // console.log(1)
    $(this).next().slideToggle();
  });

//   点击按钮让侧边栏隐藏
$('.icon_menu').on('click',function(){
    $('.lt_bg').toggleClass('active');
    $('.lt_aside').toggleClass('active');

})
$('.icon_logout').on('click',function(){
    $('#logoutModal').modal('show');
})
$('.btn_logout').on('click',function(){
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function(info){
      console.log(info)
      if(info.success){
        location.href = "login.html";
      }
    }
  })
})
