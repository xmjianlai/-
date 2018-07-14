$(function(){
    var page=1;
    var pageSize=5;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success: function (info) {
                console.log(info);
                //让数据和模版进行绑定, 模版中就可以直接使用info中的所有的属性
                var html = template("tpl", info);
                $("tbody").html(html);
        
                //分页的功能
                $("#paginator").bootstrapPaginator({
                  bootstrapMajorVersion: 3, //指定bootstrap的版本
                  size: 'small',  //设置分页控件的大小
                  currentPage: page, //设置当前页
                  totalPages: Math.ceil(info.total / info.size), //设置总页数,需要计算
                  onPageClicked: function (a, b, c, p) {
        
                    //修改当前页
                    page = p;
                    //重新渲染
                    render();
                  }
                });
              }
        });
    }
var id;
var isDelete;
$('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    // 获取id  获取参数id isDelete
    id=$(this).parent().data('id');
    // 获取isdelete
    isDelete=$(this).hasClass("btn-success")?1:0;
});
// 获取id  获取参数id isDelete
$(".btn_confirm").on("click", function () {
    $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
            id:id,
            isDelete:isDelete
        },
        success:function(info){
            console.log(info);
            if(info.success){
                // 隐藏模态框
                $('#userModal').modal('hide');
                // 重新渲染页面
                render();

            }

        }
    })
})


})