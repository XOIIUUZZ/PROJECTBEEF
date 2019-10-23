$.ajax({
	url: api + 'getquestiondetail',
	type:'get',
	dataType:'json',
	success:function(res){
		if(res.success){
			let html = "";
			let questiondetail = document.querySelector('.hero-article-detail');
			html = res.data.question[0].detail;
			questiondetail.innerHTML = html;
			
		}
	}
})