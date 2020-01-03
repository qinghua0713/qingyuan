

$(document).ready(function () {
	var url = "https://www.artmore.top/"
	//轮播图
	var delay = 5000
	var mySwiper1 =new Swiper('.main-container', {

		loop: true,
		autoplay: {
			delay:delay,
			disableOnInteraction: false,
		},
		speed: 600,
		delay: delay,
		simulateTouch: false,
		calculateHeight: 750,
		direction: "horizontal",
	})


	//锚点链接
	var anchor = ["#About_us", "#gs_addss", "#yspdy", "#ysp_ht"]
	$.ajax({
		type: "get",
		dataType: "json",//
		url: url + "index/get",
		success: function (data) {
			localStorage.setItem("locaLstore", JSON.stringify(data))
			var getLocaLstore = localStorage.getItem("locaLstore")
			var dataList = JSON.parse(getLocaLstore)
			//渲染顶部导航
			console.log(dataList.two.module)
			for (var i = 0; i < dataList.one.nav.length; i++) {
				$(".nav_cont ul ").append
					("<li class='nav_item'><a  href=" + anchor[i] + ">" + dataList.one.nav[i].btitle + "</a></li>")
				$(".nav_item").eq(0).children("a").addClass("current_c")
			}
			//顶部导航的每个a点击添加类名
			$(".nav_item ").click(function () {
				$(".nav_item").children("a").removeClass("current_c")
				$(this).children("a").addClass("current_c")

			})
			//顶部当行a链接加上过度效果
			$('a').click(function (event) {
				$('html, body').animate({
					scrollTop: $($(this).attr('href')).offset().top
				}, 500);
			});
			//渲染logo
			$(".logo").append("<a href='#'><img src=" + dataList.one.varied_img.logo_img + " alt=''></a>")
			//给banner添加背景图片
			$(".slide-banner").css({
				"background": "url(" + dataList.one.conter_img[0].background + ")no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.one.conter_img[0].background + ", sizingMethod='scale')"
			})
			//渲染登陆按钮的背景图片
			$(".login a").css({
				background: "url(" + dataList.one.varied_img.login_img + ") no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.one.varied_img.login_img + ", sizingMethod='scale')"
			})
			//渲染banner上的文本内容
			$(".biaoqian").append("<img src=" + dataList.one.conter_img[0].img + " alt=''>")
			$(".title_font").append(dataList.one.conter_img[0].big_title, dataList.one.conter_img[0].small_title)

			//渲染关于我们的列表数据
			$(".left_hp").css({
				background: "url(" + dataList.two.other.left_backgropund + ") no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.two.other.left_backgropund + ", sizingMethod='scale')",
				backgroundSize: "100% 100%"
			})
			$(".right_hp").css({
				background: "url(" + dataList.two.other.right_backgropund + ") no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.two.other.right_backgropund + ", sizingMethod='scale')",
				backgroundSize: "100% 100%"
			})



			$(".zwjs").append("<h2>" + dataList.two.other.big_btitle + "</h2><p class='About'>" + dataList.two.other.small_btitle + "</p>" + dataList.two.other.details)
			for (var j = 0; j < dataList.two.module.length; j++) {
				$(".tab-list").append("<div class='swiper-slide vertical-item'><div class='item_info current_item'><h3>" + dataList.two.module[j].title + "</h3><p>" + dataList.two.module[j].content + "</p></div></div>")

			}

			var mySwiper2 = new Swiper('.swiper-tab', {
				direction: 'horizontal',
				loop: true, // 循环模式选项

				speed: 1000,
				autoplay: {
					delay:delay,
					disableOnInteraction: false,
				},
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 10,


			})

			//渲染公司地址模块
			$(".gs_addss").css({
				background: "url(" + dataList.three.other.background + ") no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.three.other.background + ", sizingMethod='scale')",

			})
			$(".gsdz_cont").append("<h2>" + dataList.three.other.big_title + "</h2><p >" + dataList.three.other.small_title + "</p>")
			for (var n = 0; n < dataList.three.module.length; n++) {
				$(".gsjs_info").append("<div ><div ><img src=" + dataList.three.module[n].img + " alt=''></div><div ><h2>" + dataList.three.module[n].title + "</h2><p>" + dataList.three.module[n].addr + "</p><p>" + dataList.three.module[n].details + "</p></div></div>")
				$(".gsjs_info").children("div").eq(0).addClass("top_cont").children("div").eq(0).addClass("gstp_left").parent().children("div").eq(1).addClass("right_js")
				$(".gsjs_info").children("div").eq(1).addClass("bottom_cont").children("div").eq(0).addClass("gstp_right").parent().children("div").eq(1).addClass(" left_js")

			}
			//渲染艺术品档案模块
			$(".view_more").css({
				background: "url(" + dataList.four.other.check_many + ")  no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.four.other.check_many + ", sizingMethod='scale')",
				backgroundSize: '100% 100%'
			})
			$(".yst_title_cont").append("<div class='yst_title_cont max-944'><h2>" + dataList.four.other.big_title + "</h2><p class='other_yw'>" + dataList.four.other.small_title + "</p><p>" + dataList.four.other.details + "</p></div>")
			for (var b = 0; b < dataList.four.img.length; b++) {
				$(".ys_classify .classify_list").append("<div class='swiper-slide classify_item' ><a  href=''><img src=" + dataList.four.img[b].img_yes + " alt=''></a></div>")
			}


			var mySwiper3 = new Swiper('.ys_classify', {
				loop: true,
				direction: "horizontal",
				autoplay: {
					delay:delay,
					disableOnInteraction: false,
				},
				speed: 600,
				slidesPerView: 3,
				centeredSlides: true,
				spaceBetween: 16,
				delay: delay,
				simulateTouch: false,
				calculateHeight: 750,
			})

			//渲染艺术品服务合同模块数据
			$(".ysp_ht").css({
				background: "url(" + dataList.five.other.backgropund + ") no-repeat",
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + dataList.five.other.backgropund + ", sizingMethod='scale')"
			})
			$(".ysp_title_cont").append("<h2>" + dataList.five.other.big_title + "</h2><p class='small_title'>" + dataList.five.other.small_title + "</p><p>" + dataList.five.other.details + "</p>")
			$(".coypright").append("<div class='left_cop'><span>" + dataList.five.other.name + "</span></div><div class='right_cop'><a href='www.beian.miit.gov.cn'>" + dataList.five.other.copyright + "</a></div>")
			$(".video_cont video").attr("src", dataList.five.other.video)
			for (var a = 0; a < dataList.five.module.length; a++) {
				var index = a
				index = index + 1 < 9 ? "0" + (index + 1) + "." : (index + 1) + "."
				$(".right_js ul").append("<li><h3>" + index + dataList.five.module[a].big_title + "</h3><p>" + dataList.five.module[a].small_title + "</p></li>")
			}
			//渲染底部登陆图标
			for (var c = 0; c < dataList.five.login_img.length; c++) {
				$(".login_opt").append("<a><img src=" + dataList.five.login_img[c].img + " alt=''></a>")
				dataList.five.login_img[c]
			}
		},
		error: function (err) {
			console.log("这是请求失败的");
		}
	});



	$(window).scroll(function () {

		function scrollTop(el) {
			if ($(window).scrollTop() + $(window).height() > $(el).offset().top) {
				$(el).addClass("animated fadeInUpBig")
			}
		}
		// scrollTop(".zwjs")
		//  scrollTop(".swiper-tab")
		//  scrollTop(".gsdz_cont")
		//  scrollTop(".right_js")
		//  scrollTop(".left_js")
		//  scrollTop(".gstp_left")
		//  scrollTop(".ys_classify")
		//  scrollTop(".video_cont")
		//  scrollTop(".yst_title_cont")
		//  scrollTop(".ysp_title_cont")
		//  scrollTop(" .top_cont")
		//  scrollTop(" .bottom_cont")





	})

	//点击给头部导航添当前加字体颜色







})