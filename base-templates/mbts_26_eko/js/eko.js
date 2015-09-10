// using "jQuery" here instead of the dollar sign will protect against conflicts with other libraries like MooTools
jQuery(document).ready(function() {

    //Set default Jacked ease
    Jacked.setEase("Expo.easeOut");
	Jacked.setDuration(500);
    Jacked.setEngines({
        firefox: true,
        opera: true,
        safari: true,
		ios: true
    });
    jQuery.easing.def = "easeInOutExpo";
    jQuery.eko();

});

// plugin structure used so we can use the "$" sign safely
 (function($) {

    //main vars
    var mainContainer;
	var scrollTop;
	var win;
	var contWidth;
	var prevContWidth;
	var isMobile;
	var isIE;
	var isIE8;
	var firstLoad = true;
	
	//Pages
    var homePage;
	var skillsHaveAnimated = false;
	var animateSkills = false;
	var progressBarsAnimated = false;
	var sglCont;
	var mediaCont;
	var txtCont;
	var pHeading;
	var pPara;
	var logoCont;
	var logoH;
	var homeIsAnimating = false;
	


    // class constructor / "init" function
    $.eko = function() {
		
		
		
        // write values to global vars, setup the plugin, etc.
        browser = Jacked.getBrowser();
        isMobile = (Jacked.getMobile() == null) ? false : true;
		isIE8 = Jacked.getIE();
		
		if(isMobile){
		   $('html').addClass('mobile');
		   $('video').remove();
		}
		if(isIE8){
			$('html').addClass('ie8');
		    //$('video').remove();
		}
		
		isIE = browser == 'ie' ? true : false;
		
		//conditional compilation
		var isIE10 = false;
		/*@cc_on
			if (/^10/.test(@_jscript_version)) {
				isIE10 = true;
			}
		@*/
		if(isIE10) isIE = true;
		if(isIE) $('html').addClass('ie');
		
		
		
		//listen to video start and remove preloader
		if($('body').find('video').length){
			var video = document.getElementById("video");
			var vTime;
			
			
			function onVideoPlaying(){
				
				//  Current time  
				vTime = video.currentTime;
				
				if(vTime.toFixed(1) > 0){
					$('.preloader.main').fadeOut();
					video.removeEventListener("timeupdate", onVideoPlaying);
				}
				
			};
			
			
			video.addEventListener("timeupdate", onVideoPlaying , false);
		}


		
		//Save DOM elements
		win = $(window);
		win.scrollTop(0);
		homePage = $('#home');

		mainContainer = $('.container');
        contWidth = mainContainer.width();
		prevContWidth = contWidth;
		
		//handle window events
		$(window).resize(function() {						  
             handleWindowResize();
		});
		handleWindowResize();
		
		
		$('.progressbars').bind('inview', function (event, visible) {
		  if (visible == true) {
			initProgressBars();
			$('.progressbars').unbind('inview');
		  }
		});
		
		if(!isIE8){
			$('.progresscircles').bind('inview', function (event, visible) {
			  if (visible == true) {
				animateSkills = true;
				initSkills();
				$('.progresscircles').unbind('inview');
			  }
			});
		}
		

		//Init
		loadLogo();
		initHome();
		initMenu();
		initAccordion();
		initFlexSlider();
		initTipsy();
		initInputFields();
		initContactForm();
		initNewsletter();
		initNews();
		scaleIframes();
		initSectionBackgrounds();
		initTabs();
		initPortfolio();
		initSkills();
		initHoverdir();
		initTestimonial();
		initApps();




    }
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Home page
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function initHome(){
		

		var ekoSlider = $('.ekoSlider');
		var li = ekoSlider.find('li').addClass('hidden');
		var total = ekoSlider.find('li').length;
		var next = ekoSlider.find('.next');
		var prev = ekoSlider.find('.prev');
		var curNum = 0;
		var curLi = li.eq(curNum).addClass('current');
		var nextLi = null;
		
		//launch
		showHomeSlide(curLi);
		
		//links
		ekoSlider.find('a').each(function() {
															  
			 var a = $(this);
			 var s = a.attr('data-scrollto');
			 
			 
			 if(s){
				 a.click(function(e) {
						e.preventDefault();
						$.scrollTo(s, 800);		 
				 });
			 }
					
				
	    });
		
		
		
		
		//buttons
		next.add(prev).addClass('animate');
		next.click(function() {
							
			if(!homeIsAnimating){
			
			console.log(homeIsAnimating);
				if(curNum<total-1){
					curNum++;
				}
				else{
					curNum = 0;
				}
				
				curLi = ekoSlider.find('.current');
				nextLi = li.eq(curNum);
				
								
				removeHomeSlide(curLi,nextLi);		
				
			}
					
		});
		
		prev.click(function() {
			
			if(!homeIsAnimating){
				
				if(curNum>0){
					curNum--;
				}
				else{
					curNum = total-1;
				}
				
				curLi = ekoSlider.find('.current');
				nextLi = li.eq(curNum);
				
								
				removeHomeSlide(curLi,nextLi);
			
			}
					
		});
		
		
		if(!$('body').find('video').length){
			$('.preloader.main').fadeOut();
		}
		
		

		
	
		
	}
	
	
	function showHomeSlide(li){
		
		homeIsAnimating = true;
		
		var curLi = li;
		
		var left = curLi.find('.left');
		var right = curLi.find('.right');
		
		
		left.css({
			  'opacity': 0,
			  'margin-top': -300 + 'px'
		});
		
		
		right.css({
			  'opacity': 0,
			  'margin-top': 300 + 'px'
		});
		

		
		curLi.parent().parent().removeClass('hidden');
		curLi.removeClass('hidden').addClass('current');

		if(curLi.find('.scaleframe').length) $('.scaleframe').removeClass('hidden');
		
		left.animate({ 
		      'margin-top': 0,
			  opacity: 1
		}, 1000);
		
		right.animate({ 
		      'margin-top': 0,
			  opacity: 1
		}, 1000, function() {
			
			homeIsAnimating = false;	

		});
		
		
		
	}
	
	function removeHomeSlide(curLi,nextLi){
		
		homeIsAnimating = true;
		
		
		var left = curLi.find('.left');
		var right = curLi.find('.right');
		
		left.animate({ 
		      'margin-top': -300 + 'px',
			  opacity: 0
		}, 1000);
		
		right.animate({ 
		      'margin-top': 300 + 'px',
			  opacity: 0
		}, 1000, function() {
				
			curLi.addClass('hidden').removeClass('current');
			
			//stop video if any
			if(curLi.find('.scaleframe').length){
				var frame = curLi.find('.scaleframe iframe');
				var src = frame.attr('src');
				frame.attr('src', '');
				frame.attr('src', src);
				$('.scaleframe').addClass('hidden');
			}
			
			homeIsAnimating = false;
			showHomeSlide(nextLi);
			
		});
		
	}
	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //loadLogo
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function loadLogo() {
		
		//get
        logoCont = $('.logo');
		var logoSrc = logoCont.attr('data-src');
		var logoW = logoCont.attr('data-width');
		logoH = logoCont.attr('data-height');
		
		//css
		logoCont.css({
			  'opacity': 0,
			  'width': logoW + 'px',
			  'height': logoH + 'px',
			  'margin-left': -logoW/2 + 'px',
			  'margin-top': -logoH/2-50-win.height()/2 + 'px'
		});

        var img = $("<img />").appendTo(logoCont);
        img.attr("src", logoSrc);
		
		if($(img)[0].complete){
			
			img.appendTo(logoCont);
			
			logoCont.animate({ 
				opacity: 1,
				'margin-top': 20 + 'px'
			}, 1000);

			$('.mainnav').delay(200).animate({ 'margin-top': '-49px'}, 1000);
		
		}
		else{
		   img.load(logoLoaded);
		}
		
		

    }
	
	function logoLoaded(event) {
		
		logoCont.animate({ 
				opacity: 1,
				'margin-top': 20 + 'px'
			}, 1000);

		$('.mainnav').delay(200).animate({ 'margin-top': '-49px'}, 1000);
		
		
		
	}
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //APP SHOWCASE
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function initApps(){

		AppShowcase.init();
		
	}
	

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TESTIMONIALS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function initTestimonial(){
		
		
		$( '.cbp-qtrotator' ).cbpQTRotator();
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //HOVER DIR
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

	function initHoverdir(){
         $("figure.hoverdir").each(function(i) {
											
											
				var fig = $(this);
				var img = fig.find('img');
				var cont = fig.parent();
				var cap = fig.find('figcaption');
				var lh = cap.height()/2;
				var cw = fig.width();
				
				var ow = img.attr('width');
				var oh = img.attr('height');
				var ratio = ow/oh;
				
				var rh = cw/ratio;
				
				
				cap.css({
					width: cw+'px',
					paddingTop: (rh)/2-lh+4+'px',
					paddingBottom: (rh)/2-lh-4+'px'
				});
				
				
				
				fig.hoverdir({
					hoverDelay : 0
				});	
		 });
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //PORTFOLIO
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initPortfolio() {
		
		sglCont = $(".portfolioSingle");
	    mediaCont = sglCont.find('.twothird');
	    txtCont = sglCont.find('.onethird').not('nav');
		

		var curSingle = 0;
		var curPortfolio;
		var curPortfolioTotal;
		
		pHeading = $("<h4 />").appendTo(txtCont);
		pPara = $("<p />").appendTo(txtCont);
		
		setFigHover();
		$("#portfolio figure").each(function(i) {
				
				var fig = $(this);

				//Portfolio single
				fig.click(function() {
								   
                    var f = $(this);
					curSingle = i;
					curPortfolio = f.parent();
					curPortfolioTotal = curPortfolio.find('figure').length;

					
					loadPortfolioSingle(f);
					
				});
				
		});
		
		//single navigation
		var closeBtn = $(".portfolioSingle nav .close");
		var nextBtn = $(".portfolioSingle nav .next");
		var prevBtn = $(".portfolioSingle nav .prev");
		var linkBtn = $(".portfolioSingle nav .link");
		
		closeBtn.click(function() {
				sglCont.slideUp(500, function() {
					if(sglCont.find('iframe').length){
						mediaCont.html('');
					}
				});	   
		});
		
		nextBtn.click(function() {		   
				curSingle = (curSingle < curPortfolioTotal-1) ? curSingle = curSingle+1 : curSingle = 0;
				//emptySinglePortfolio();
				loadPortfolioSingle(curPortfolio.find('figure').eq(curSingle));
		});
		
		prevBtn.click(function() {		   
				curSingle = (curSingle > 0) ? curSingle = curSingle-1 : curSingle = curPortfolioTotal-1;
				//emptySinglePortfolio();
				loadPortfolioSingle(curPortfolio.find('figure').eq(curSingle));
		});
		
		linkBtn.click(function() {
				var u = curPortfolio.find('figure').eq(curSingle).attr('data-url');	
				var t = curPortfolio.find('figure').eq(curSingle).attr('data-target');
				 window.open(u,t);
				
		});
		
		
	};
	
	
	function setFigHover(){
		if(firstLoad){
		window.onload = function() {
			$("figure.hoverdir").each(function(i) {
					
					var fig = $(this);
					var img = fig.find('img');
					var cont = fig.parent();
					var cap = fig.find('figcaption');
					var hh = cap.find('h4').height()/2;
					var lh = cap.height()/2;
					var diffH = lh-hh;
					var cw = fig.width();
	
	
					var ow = img.width();
					var oh = img.height();
					
					var ratio = ow/oh;
					
					var rh = cw/ratio;
					
	
						cap.css({
							width: cw+'px',
							paddingTop: (rh)/2-lh+'px',
							paddingBottom: (rh)/2-lh+'px'
						});

			});
		}
		firstLoad = false;
		}
		else{
			$("figure.hoverdir").each(function(i) {
					
					var fig = $(this);
					var img = fig.find('img');
					var cont = fig.parent();
					var cap = fig.find('figcaption');
					var hh = cap.find('h4').height()/2;
					var lh = cap.height()/2;
					var diffH = lh-hh;
					var cw = fig.width();
	
	
					var ow = img.width();
					var oh = img.height();
					
					var ratio = ow/oh;
					
					var rh = cw/ratio;
					
	
						cap.css({
							width: cw+'px',
							paddingTop: (rh)/2-lh+'px',
							paddingBottom: (rh)/2-lh+'px'
						});
	
	
			});
			
		}
		
		
	}
	
	function scaleIframes() {

        if ($('.scaleframe').length) {
			$('.scaleframe').fitVids();
        }

    }
	
	function emptySinglePortfolio(){
		
		mediaCont.add(txtCont).css('opacity', 0);
		$('<div class="one sPreloader row"><div class="preloader"></div></div>').insertBefore(sglCont);
		sglCont.addClass('hidden');
		//$.scrollTo(sglCont.parent(), 500);
		$.scrollTo(sglCont.parent().parent().find('.separator').first(), 500, {offset: -30});
		
		//remove previous
		if(sglCont.find('h3').length){
			//sglCont.find('h3').add(sglCont.find('p')).remove();
		}
		if(sglCont.find('img').length){
			sglCont.find('img').remove();
		}
		if(sglCont.find('iframe').length){
			mediaCont.html('');
		}
		if(sglCont.find('.flexslider').length){
			mediaCont.html('');
		}
					
	}
	
	function loadPortfolioSingle(itm){
		
		var f = itm;
		
		var media = f.attr('data-largeMedia');
		var flexAr = media.split(',');
		var type = f.attr('data-mediaType');
		pHeading.html(f.attr('data-largeTitle'));
		pPara.html(f.attr('data-largeDesc'));
		
		if(type == 'image'){
			
			if(flexAr.length > 1){
				loadFlexSlider(flexAr, mediaCont);
			}
			else{
		       loadPortfolioImage(media, mediaCont);
			}
		}
		else if(type == 'youtube'){
			var htm = '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + media + '?hd=1&amp;wmode=opaque&amp;showinfo=0" frameborder="0" allowfullscreen ></iframe>';
			emptySinglePortfolio();
			mediaCont.html(htm);
			scaleIframes();
			$('.sPreloader').remove();
			sglCont.removeClass('hidden').slideDown();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		else if(type == 'vimeo'){
			var htm = '<iframe width="640" height="360" src="http://player.vimeo.com/video/' + media +'" frameborder="0" allowfullscreen ></iframe>';
			emptySinglePortfolio();
			mediaCont.html(htm);
			scaleIframes();
			$('.sPreloader').remove();
			sglCont.removeClass('hidden').slideDown();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		
	}
	
	
	function loadPortfolioImage(path, cont) {
        emptySinglePortfolio();
        var img = $("<img />").addClass('scaletofit').appendTo(cont);
        img.attr("src", path);
		
		if($(img)[0].complete){
			img.appendTo(cont);
			$('.sPreloader').remove();
			sglCont.removeClass('hidden').slideDown();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		else{
		   img.load(portfolioImgLoaded);
		}


    }
	
	function portfolioImgLoaded(event) {
		event.stopPropagation();
		$('.sPreloader').remove();
		sglCont.removeClass('hidden').slideDown();
		mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
	}
	
	function loadFlexSlider(ar, cont) {
		
		var fCont = $('<div/>').addClass('flexslider arrowvisible').attr('data-arrows', true).attr('data-thumbnail', false);
		var fList = $('<ul/>').addClass('slides').appendTo(fCont);
	
		for(var i=0;i<ar.length;i++){
			 var li = $('<li/>').appendTo(fList);
			 var img = $('<img/>').attr('src', ar[i]).appendTo(li);
		}
	    emptySinglePortfolio();
		fCont.appendTo(cont);
		
		$('.sPreloader').remove();
		sglCont.removeClass('hidden').slideDown();
		mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		startPortfolioFlex(fCont);

    }
	
	
	function startPortfolioFlex(target) {
		

				var s = target.css('opacity',0);
				var useArrows = s.attr('data-arrows') == 'true' ? true : false;
				var useThumbs = s.attr('data-thumbnail') == 'true' ? true : false;

	
				s.flexslider({
					animation: "slide",
					video: false,
					directionNav: useArrows,
					controlNav: useThumbs,
					pauseOnAction: true,
					pauseOnHover: true,
					slideshow: true,
					start: function(slider) {
						s.animate({ opacity: 1 }, 1000);
						}
				});


    }


	
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //FLEX SLIDER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initFlexSlider() {
		

        if ($('.flexslider').length) {
			
			$('.flexslider').each(function() {
				var s = $(this).css('opacity',0);
				var useArrows = s.attr('data-arrows') == 'true' ? true : false;
				var useThumbs = s.attr('data-thumbnail') == 'true' ? true : false;
				
				
	
				s.flexslider({
					animation: "slide",
					video: false,
					directionNav: useArrows,
					controlNav: useThumbs,
					pauseOnAction: true,
					pauseOnHover: true,
					slideshow: true,
					start: function(slider) {
						s.animate({ opacity: 1 }, 1000);
						}
				});
			});

        }

    }
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initMenu() {
		
		
		var menu = $('.mainnav');
		var menuList = $('.mainnav ul');
		var dropDown = $(".mainnav select");
		var menuHasAnimated = false;

		menu.localScroll(800);


        // Populate dropdown with menu items
        $(".mainnav a").each(function() {

            var el = $(this);
            var optSub = el.parents('ul');
            var len = optSub.length;
            var subMenuDash = '&#45;';
            var dash = Array(len).join(subMenuDash);

            $("<option />", {
                "value": el.attr("href"),
                "html": dash + el.text()
                }).appendTo(dropDown);
			
        });
		

        dropDown.change(function() {
			$.scrollTo($(this).find("option:selected").val(), 1000);
        });
		

		//menu scroll
		$(window).scroll(function() {
			
			updateMenuHighlight();
								  
			scrollTop = $(window).scrollTop();

			
			if(scrollTop>= win.height()-49){

				menu.css({
					position: 'fixed',
					top: 0,
					left: 0,
					marginTop: 0
				});
				
				$('.ekoSlider').add($('.logo')).css('visibility','hidden');
				
	
			}
			else{
				
				menu.css({
					position: 'relative',
					marginTop: '-49px'
				});
				
				$('.ekoSlider').add($('.logo')).css('visibility','visible');
				
				
			}
			
		});
		


    }
	
	/////////////////////////////////////////////////////////////////////////////
	//MENU HIGHLIGHT WHEN PAGE SCROLL
	/////////////////////////////////////////////////////////////////////////////
	function updateMenuHighlight(){
		
		var topRange = 400;
		var contentTop		=	[];
		var contentBottom	=	[];
		var content	=	[];
		var winTop	=	$(window).scrollTop();
		var rangeTop	=	400;
		var rangeBottom	=	400;

		$('.mainnav a').each(function(){
			if($(this).attr('href').split('#')[0] == ""){
				content.push( $( $(this).attr('href') ) );
				contentTop.push( $( $(this).attr('href') ).offset().top );
				contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
			}
		})

		$.each( contentTop, function(i){

			if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
				
				//check for and animate skills
                
				
				//highlight menu
				$('.mainnav a')
				.removeClass('selected')
				.eq(i).addClass('selected');
				
				var curPage = $('.mainnav a').eq(i).attr('href').split('#')[1];
				var curAddress = window.location.href.split('#/')[1];

				
				
				
			}

		})
		
		
		
	}
	
	function checkMenuWidth() {
        
		/*
        var availableWidth = $('.mainnav').parent().width();
        //var menuWidth = $('.mainnav').width();
        var mainMenu = $('.mainnav ul');
        var dropDown = $('.mainnav form');
		
		var menuWidth = 0;
		$('.mainnav ul li').each(function() {
			menuWidth += $(this).outerWidth( true );
		});
		
		console.log("w: "+availableWidth + "mw: "+menuWidth);

        if (availableWidth >= menuWidth) {
            mainMenu.css({
                'visibility': 'visible'
				
            });
            dropDown.css({
                'display': 'none'
            });
        } else {
			mainMenu.css({
                'visibility': 'hidden'
				
            });
            dropDown.css({
                'display': 'inline-block'
            });
        }
		*/

    }
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TABS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initTabs() {

        //check if tabs exists
        if ($('.tabs').length) {

            var coolTabs = $(".tabs");
            var auto = coolTabs.attr('data-autoPlay') == "true" ? true: false;
            var delay = parseInt(coolTabs.attr('data-autoDelay'), 10);

            coolTabs.tabs({
                show: function(event, ui) {
                    var lastOpenedPanel = $(this).data("lastOpenedPanel");
                    if (!$(this).data("topPositionTab")) {
                        $(this).data("topPositionTab", $(ui.panel).position().top)
                        }
                    // do crossfade of tabs
                    $(ui.panel).hide().css('z-index', 2).fadeIn(300, function() {
                        $(this).css('z-index', '');
                        if (lastOpenedPanel) {
                            lastOpenedPanel.toggleClass("ui-tabs-hide").hide();
                        }
                    });

                    $(this).data("lastOpenedPanel", $(ui.panel));
                }
            });

            if (auto) {
                coolTabs.tabs('rotate', delay);
            }

            }
			
			checkTabSize();

    }
	
	function checkTabSize() {
		
		if($('.tabs').length){
			
			$('.tabs').each(function(i) {
									 
				var t = $(this);
				var pw = t.parent().width();
				var list = t.find('ul').first();
				var items = list.find('li');
				var last = list.find('li:last-child');
				var a = t.find('ul li a');
				var itemsw = 0;

				items.each(function(i) {
					var l = $(this);
					var w = textWidth(l.find('a'), 14, true)+30;
					itemsw += w;
					
				});
				
				if(itemsw >= pw){
					
					list.css({
						height: 'auto'
					});
					
					items.css({
						  marginBottom: '2px',
						  float: 'none'
					});
					
					a.css({
						  display: 'block',
						  float: 'none'
					});
					
				}
				else{
					
					list.css({
						height: '37px'
					});
					
					items.not(last).css({
						  borderRight: 'none'
					});
					
					items.css({
						  marginBottom: 0,
						  float: 'left'
					});
					
					a.css({
						  display: 'inline',
						  float: 'left'
					});
					
				}
															
			});
			
		}
		
	}
	
	function textWidth(txt, fontSize, isHtml) {
		
        var html_calc;
		
		if(isHtml){
			html_calc = $('<span>' + txt.html() + '</span>');
		}
		else{
			html_calc = $('<span>' + txt + '</span>');
		}
        html_calc.css('font-size', fontSize + 'px').hide();
        html_calc.prependTo('body');
        var width = html_calc.width();
        html_calc.remove();
        return width;
    }
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CAROUSEL
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function initSectionBackgrounds(){
		
		$('.wrapper').each(function(){
									
			var w = $(this);
			var db = w.attr('data-pattern');
			
			if(db && db != ""){
			   
			   w.css({
					backgroundImage: 'url(' + db + ')',
					backgroundRepeat: 'repeat'
				});
			}
									 
		});
		
			$('.footerPattern').each(function(){
										
				var w = $(this);
				var db = w.attr('data-pattern');
				
				if(db && db != ""){
				   
				   w.css({
						backgroundImage: 'url(' + db + ')',
						backgroundRepeat: 'repeat'
					});
				}
										 
			});
		
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //MAKE IFRAMES RESPONSIVE
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function scaleIframes() {

        if ($('.scaleframe').length) {

			$('.scaleframe').fitVids();

        }

    }

	
	

	
	/////////////////////////////////////////////////////////////////////////////
	//NEWS
	/////////////////////////////////////////////////////////////////////////////
	
	function initNews(){
		
        if ($('.news').length) {
			
			var s = null;
			var top;
			
			$('.news').each(function(i) {

			    if(i==0) top = n;
				
				var n = $(this);
				var m = n.find('.mainNews');
				var btn = n.find('.button');
				var openBtn = n.find('.button.open');
				var closeBtn = n.find('.button.close');
				//var c = n.find('.content');
				//var f = n.find('figure');
				
				
				//header and image click
				btn.click(function(e) {
								   
					e.preventDefault();
					
					//slidedown
					if(n.hasClass('selected')){
						
						n.removeClass('selected');
						s = null;
						
						m.slideUp(1000, function(){
												 
							//stop video if any
							if(n.find('.scaleframe').length){
								var frame = n.find('.scaleframe iframe');
								var src = frame.attr('src');
								frame.attr('src', '');
								frame.attr('src', src);
								//$('.scaleframe').addClass('hidden');
							}					 
												 
						});
						
						isSliding = true;
						$.scrollTo(n.parent(), 1000, {offset: 0});
						
						
						closeBtn.addClass('hidden');
						openBtn.removeClass('hidden');
				        
						
						

					}
					else{
						n.addClass('selected');
						s = n;
						m.slideDown(1000);
						$.scrollTo(n, 1000, {offset: -80});
						
						openBtn.addClass('hidden');
						closeBtn.removeClass('hidden');
					}
					

                    
					
					
				});
				
				//if(n.hasClass('open')) h.click();
				
										   
			});
			
		};

		
	}
	
	
	function openNews(){
		
        if ($('.news').length) {
			
			var s = null;
			var top;
			
			$('.news').each(function(i) {

										   
				var n = $(this);
				var h = n.find('.title');
				var c = n.find('.content');
				var f = n.find('figure');
				
				if(n.hasClass('open')) h.click();
				
										   
			});
			
		};

		
	}

	/////////////////////////////////////////////////////////////////////////////
	//Init progress bars
	/////////////////////////////////////////////////////////////////////////////
	
	function initProgressBars(){
		
		if ($('.progressbars').length) {
			
			$('.progressbars').each(function() {
									   
				var s = $(this);
				
				s.find('.over').each(function(i) {
											  
					var o = $(this);
					var pct = o.attr('data-percentage');
					
					o.delay(200*(i+1)).animate({
							width: pct+'%'
						}, 2000
					);
					
				});
									
			});
			
		}
		
	}
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////
	//Init skills
	/////////////////////////////////////////////////////////////////////////////
	
	function initSkills(){
		
		if ($('.progresscircles').length) {
			
			$('.progresscircles').find('svg').remove();
			
			$('.progresscircles').each(function(i) {
									   
				var s = $(this);
				var contWidth = s.width();
				var arc = s.find('.arc');
				arc.attr('id', 'arc'+i);
				
				var amount = arc.attr('data-percent');
				var strkw = arc.attr('data-stokewidth');
				var sign = arc.attr('data-sign');
				var fontSize = arc.attr('data-fontSize');
				var circleColor = arc.attr('data-circleColor');
				var strokeInnerColor = arc.attr('data-innerStrokeColor');
				var strokeColor = arc.attr('data-strokeColor');
				var textColor = arc.attr('data-textColor');
				var circleSize = arc.attr('data-size');
				
				
				if(parseInt(circleSize, 10)+parseInt(strkw, 10)>contWidth){
					circleSize = contWidth-strkw;
				}
				
				var fullSize = parseInt(circleSize, 10)+parseInt(strkw, 10);


				var interval;
				

                //Create raphael object
				var r = Raphael('arc'+i, fullSize, fullSize);
				
				//draw inner circle
				r.circle(fullSize/2, fullSize/2, circleSize/2).attr({ stroke: strokeInnerColor, "stroke-width": strkw, fill:  circleColor });
	
				//add text to inner circle
				var title = r.text(fullSize/2, fullSize/2, 0+sign).attr({
					font: fontSize+'px Oswald',
					fill: textColor
				}).toFront();
				
				
				r.customAttributes.arc = function (xloc, yloc, value, total, R) {
					
					
					var alpha = 360 / total * value,
						a = (90 - alpha) * Math.PI / 180,
						x = xloc + R * Math.cos(a),
						y = yloc - R * Math.sin(a),
						path;
					if (total == value) {
						path = [
							["M", xloc, yloc - R],
							["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
						];
					} else {
						path = [
							["M", xloc, yloc - R],
							["A", R, R, 0, +(alpha > 180), 1, x, y]
						];
					}
					return {
						path: path
					};
				};
				
				//make an arc at 150,150 with a radius of 110 that grows from 0 to 40 of 100 with a bounce
				var my_arc = r.path().attr({
					"stroke": strokeColor,
					"stroke-width": strkw,
					arc: [fullSize/2, fullSize/2, 0, 100, circleSize/2]
				});
				
				
				var anim = Raphael.animation({
					arc: [fullSize/2, fullSize/2, amount, 100, circleSize/2]
				}, 1500, "easeInOut");
				
				eve.on("raphael.anim.frame.*", onAnimate);
				

				function onAnimate() {
					var howMuch = my_arc.attr("arc");
					title.attr("text", Math.floor(howMuch[2]) + sign);
				}
				
				if(animateSkills || isIE8){
					my_arc.animate(anim.delay(i*200));
				}
				
				
				
				
			});
			
		}
		
	}
	

	
	
	
	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TIPSY TOOLTIP
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initTipsy() {

        $('.tooltip').each(function() {

            var t = $(this);

            t.css({
                cursor: 'pointer'
            }).tipsy({
                gravity: 's',
                fade: true,
                offset: 5,
                opacity: 1,
                title: 'data-tooltipText'
            });

        });

    }
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ACCORDION
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initAccordion() {

        if ($('.acc').length) {
			
			//var accordion;
			
			$('.acc').each(function(i) {
									
				var ac = $(this);
				var as = ac.find('.acc-section');
				var h = ac.find('h4');
				var activeS = null;
				var activeH = null;
				
				//collapse all content
				as.css('display', 'none');
				
				//click
			    h.click(function() {
					
					var c = $(this);
					var s = c.parent().find('.acc-section');
					
					if(!c.hasClass('acc-selected')){
						
						if(activeS){
							activeH.removeClass('acc-selected');
							activeS.slideUp();
						}
						
						c.addClass('acc-selected');
						s.slideDown();
						activeS = s;
						activeH = c;
					}
					else{
						
						c.removeClass('acc-selected');
						s.slideUp();
						activeS = null;
						activeH = null;
						
					}
					
				});
				
				
				
				
			});

        }

    }
	

	


	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CONTACT FORM - INPUT FIELDS - NEWSLETTER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	
    function initNewsletter() {

        $('.mailchimp').submit(function() {

                var action = $(this).attr('action');
                var values = $(this).serialize();
				
				$.post(action, values, function(data) {
												
						$('.mailchimp input[type=submit]').fadeOut(500, function () {
						  $('.mcresult').hide().html(data).fadeIn();
						  setTimeout(resetMailchimp,5000);
						});
                        
						
                 });

                return false;

            });

    }
	
	function resetMailchimp(){
		
		$('.mcresult').html('');
		$('.mailchimp input[type=submit]').fadeIn(500);
		
		$('.mailchimp input[type=text]').each(function() {
													  
				var ipt = $(this);
				ipt.hide().val(ipt.attr('oValue')).fadeIn();
		});
		
	}
	
	function initInputFields(){
		
            var curVal;
			
			
			$('input[type=text]').each(function() {
					var ipt = $(this);
					ipt.attr('oValue', ipt.val());
					
					ipt.focus(function() {
						curVal = ipt.val();
						ipt.val('');
					});
					
					ipt.blur(function() {
						if (ipt.val() == '') {
							ipt.val(curVal);
						}
					});
					
			});
			
			$('textarea').each(function() {
					var ipt = $(this);
					ipt.attr('oValue', ipt.val());
					
					ipt.focus(function() {
						curVal = ipt.val();
						ipt.val('');
					});
					
					ipt.blur(function() {
						if (ipt.val() == '') {
							ipt.val(curVal);
						}
					});
					
			});
			
		
	}

    function initContactForm() {



            $('#contactform').submit(function() {


                var action = $(this).attr('action');
                var values = $(this).serialize();

                $('#contactform #submit').attr('disabled', 'disabled').after('<img src="images/contact/ajax-loader.gif" class="loader" />');


                $("#message").slideUp(750, function() {

                    $('#message').hide();

                    $.post(action, values, function(data) {
                        $('#message').html(data);
                        $('#message').slideDown('slow');
                        $('#contactform img.loader').fadeOut('fast', function() {
                            $(this).remove()
                            });
                        $('#contactform #submit').removeAttr('disabled');
                        if (data.match('success') != null){
                            //$('#contactform').slideUp('slow');
						}

                    });

                });

                return false;

            });

      

    }
	
	
	
	
    /////////////////////////////////////////////////////////////////////////////
	//handleWindowResize
	/////////////////////////////////////////////////////////////////////////////
	function handleWindowResize(){
        
		//home page

		
		$('.shape .bottom').add($('.shapeTop .top')).css('border-left-width', win.width()+'px');

		
		contWidth = mainContainer.width();
		
		if (contWidth != prevContWidth) {
			
			prevContWidth = contWidth;

			setFigHover();
			initSkills();
		}
		
	}
	

		

    /////////////////////////////////
    //End document


})(jQuery);