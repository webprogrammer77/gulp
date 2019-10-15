  // импортируем jQuery
  //= ../../../node_modules/jquery/dist/jquery.js

  // импортируем Popper
  //= ../../../node_modules/popper.js/dist/umd/popper.js

  // импортируем необходимые js-файлы Bootstrap 4
  //= ../../../node_modules/bootstrap/js/dist/util.js
  //= ../../../node_modules/bootstrap/js/dist/alert.js
  //= ../../../node_modules/bootstrap/js/dist/button.js
  //= ../../../node_modules/bootstrap/js/dist/carousel.js
  //= ../../../node_modules/bootstrap/js/dist/collapse.js
  //= ../../../node_modules/bootstrap/js/dist/dropdown.js
  //= ../../../node_modules/bootstrap/js/dist/modal.js
  //= ../../../node_modules/bootstrap/js/dist/tooltip.js
  //= ../../../node_modules/bootstrap/js/dist/popover.js
  //= ../../../node_modules/bootstrap/js/dist/scrollspy.js
  //= ../../../node_modules/bootstrap/js/dist/tab.js
  //= ../../../node_modules/bootstrap/js/dist/toast.js
$(function() {
  svg4everybody({});

	var pathname = window.location.pathname;
	var current_href = pathname.replace('/', '');
	var nav_links = $('.nav-header__link');
	var nav_sub_items = $('.nav-header__item--parent .nav-header__sub-list .nav-header__item');
	var nav_item_parent = $('.nav-header__item.nav-header__item--parent');
	if(pathname == '/'){
		current_href = 'index.html';
	}
	setTimeout(function(){
	$.each(nav_sub_items, function(index, value) {
			if($(this).hasClass('active')){
				$(this).parent().parent().addClass('active');
				$(this).parent().hide();
			}
		});
	},200)

	nav_item_parent.on('click touchend',function(e){
		// $(this).toggleClass('active');
		$(this).find('.nav-header__sub-list').toggle();
		$(this).find('a.nav-header__sub-link').toggleClass('rotate');
	});
	$.each(nav_links, function(index, value) {
		if($(this).attr('href') == current_href){
			nav_links.not($(this)).parent().removeClass('active');
			$(this).parent().addClass('active');
		}
	});

  $(document).on("click", ".nav-header__btn", function(e) {
    $("body").toggleClass("noScroll");
    $(this).toggleClass("active");
    $(this)
      .parent()
      .find("ul.nav-header__list")
      .toggleClass("active");
    $(".header__basket-min").toggleClass("hide");
  });
  $(document).on("click", ".nav-footer__link", function(e) {
    setProductsLocalstorage();
  });
  $(document).on("click", ".nav-header__link", function(e) {
    setProductsLocalstorage();
  });

  /*-------scrolTop------------*/

  var dropTop = $('<div id="scrolTop" hidden></div>').appendTo("body");
  var skrollTopInit = function() {
    if ($(document).scrollTop() >= 400) {
      dropTop.fadeIn(300);
    } else {
      dropTop.fadeOut(300);
    }
  };

  skrollTopInit();

  $(document).on("scroll", function() {
    skrollTopInit();
  });

  $("#scrolTop").on("click", function() {
    $("body, html").animate(
      {
        scrollTop: 0
      },
      300
    );
  });

  /*----------------localStorage-----------------------*/
  function setProductsLocalstorage() {
    var dataproducts = {};


      dataproducts[productId] = {
        sbId: productId,
        sbImg: productImg,
        sbName: productName,
        sbQuantity: productQuantity,
        sbPrice: productPrice
      };
    });

    return localStorage.setItem("basketItems", JSON.stringify(dataproducts));
  }

  function getProducts() {
    return JSON.parse(localStorage.getItem("basketItems"));
  }
  function getProduct(id) {
    var data = JSON.parse(localStorage.getItem("basketItems"));
    return data[id];
  }
  function setProducts(data) {
    var a = JSON.stringify(data, "", 4);
    return localStorage.setItem("basketItems", a), !1;
  }

  /*----------------//localStorage-----------------------*/

});
