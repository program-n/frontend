// 获取当前地址栏中的查询字符串
function searchParams(url){
    let search = location.search.slice(1) || '';
    let params = {};
    search && search .split('&').forEach(v=>{
        let [key,value] = v.split('=');
        params[key] = decodeURIComponent(value)
    })
    return params;
}


// 加载头部公共部分



function formatDate(date,format="YYYY-MM-DD HH:mm:ss"){
    return moment(date).format(format)
}
   // 进度条
   function startNprogress(){
    NProgress.set(0.4);
    let interval = setInterval(function(){
        NProgress.inc();
    },250)
    $(window).on('load',()=>{
        clearInterval(interval)
        NProgress.done()
    })
}
startNprogress() // 开启进度条

$('#nav').load('./common/nav.html',function(){
    // nav加载完毕后加载分类
    loadCate();
})
// 获取分类
async function loadCate(){
    let data = await axios.get('/cate');

    let html = ``;
    data.forEach(({name,cat_id})=>{
        html += `<li><a href="/cate.html?cat_id=${cat_id}">${name}</a></li>`
      
    })
    $('#wrapCate').html(html)
}
