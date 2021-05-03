$(function () {
  // switch file category tag
  $("#aside .guid-item").on("click", function () {
    var page = $(this).data("page");
    $(this).addClass("active").siblings().removeClass("active");
    if (page) {
      $("#aside .page-item").hide();
      $("#aside")
        .find("." + page)
        .show()
        .not(".articles-all")
        .css("display", "flex");
    }
  });

  // get categories-list
  $(".category-all .category-item").on("click", function () {
    var key = $(this).data("category");
    $(this).addClass("active").siblings().removeClass("active");
    $(".category-box ul").each(function () {
      if ($(this).data("cateBox") == key) {
        $(this).show().siblings().hide();
      }
    });
  });

  // get tags-list
  $(".tags-all .tags-item").on("click", function () {
    var key = $(this).data("tag");
    $(this).addClass("active").siblings().removeClass("active");
    $(".tags-box ul").each(function () {
      if ($(this).data("tagBox") == key) {
        $(this).show().siblings().hide();
      }
    });
  });

  // click toggle-btn to show or hide aside
  $("#toggle").on("click", function () {
    if ($(this).hasClass("fullscreen")) {
      $(this).removeClass("fullscreen");
      $("#aside").animate(
        {
          marginLeft: "0"
        },
        {
          duration: 300,
          queue: false,
          complete: function () {
            $(".contents-box").removeClass("fullscreen");
          }
        }
      );
    } else {
      $(this).addClass("fullscreen");
      $("#aside").animate(
        {
          marginLeft: "-180px"
        },
        {
          duration: 300,
          queue: false,
          step: function () {
            $(".contents-box").addClass("fullscreen");
          }
        }
      );
    }
  });

  // show back2top-btn
  $("#contents").scroll(function () {
    var t = $(this).scrollTop();
    if (t >= 800) {
      if (!$("#back2top").is(":visible")) {
        $("#back2top").show();
      }
    } else {
      $("#back2top").hide();
    }
  });

  // back to top
  $("#back2top").click(function () {
    $("#contents").animate(
      {
        scrollTop: "0"
      },
      700
    );
  });

  // show or hide sidebar list
  $("#sidebar-btn").click(function () {
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
      $("#sidebar-panel")
        .animate(
          {
            right: "-275px"
          },
          300
        )
        .dequeue();
    } else {
      $(this).addClass("show");
      $("#sidebar-panel")
        .animate(
          {
            right: "15px"
          },
          300
        )
        .dequeue();
    }
  });

  // mask-layer btn
  $(".mask-layer-btn").click(function () {
    $("#mask-layer").hide().find(".mask-layer-img").html("");
  });

  // use jquery-pjax
  $(document).pjax("[data-pjax] a, a[data-pjax]", "#contents", {
    fragment: "#contents",
    timeout: 10000
  });
  $(document).on({
    "pjax:click": function () {
      $("#contents").removeClass("fade-in").addClass("fade-out");
      NProgress.start();
    },
    "pjax:start": function () {
      $("#contents").css("opacity", 0);
    },
    "pjax:end": function () {
      $("#contents")
        .scrollTop(0)
        .css("opacity", 1)
        .removeClass("fade-out")
        .addClass("fade-in");
      NProgress.done();
      bindActive();
      pjaxEnd();
    }
  });

  bindActive();
  pjaxEnd();
});

function pjaxEnd() {
  // menu automatic hide in mobile
  if ($(window).width() <= 640) {
    $("#aside")
      .animate(
        {
          marginLeft: "-180px"
        },
        500
      )
      .dequeue();
    $("#toggle").addClass("fullscreen");
  }

  if ($("#toggle").hasClass("fullscreen")) {
    $(".contents-box").addClass("fullscreen");
  } else {
    $(".contents-box").removeClass("fullscreen");
  }

  // open page in new tab
  $('a[href^="http"]').each(function () {
    $(this).attr("target", "_blank");
  });

  // code highlight
  $("pre code").each(function (i, block) {
    hljs.highlightBlock(block);
  });

  // get sidebar list
  var html = "",
    topArr = [];
  $("#sidebar-panel .pin").css("top", "5px");
  $(".blog-content")
    .find("h1,h2,h3,h4,h5,h6")
    .each(function (i) {
      switch (this.tagName) {
        case "H1":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h1"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
        case "H2":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h2"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
        case "H3":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h3"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
        case "H4":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h4"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
        case "H5":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h5"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
        case "H6":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            '<li class="li-h6"><a href="#title' +
            i +
            '" data-index="' +
            i +
            '">' +
            $(this).text() +
            "</a></li>";
          break;
      }
    });
  if (html.length) {
    $("#sidebar-panel .sidebar-panel-ul").html(html);
    $("#sidebar-btn, #sidebar-panel").show();
  } else {
    $("#sidebar-panel .sidebar-panel-ul").html("");
    $("#sidebar-btn, #sidebar-panel").hide();
  }

  // blog-title category mapping menu
  $("#contents img").click(function () {
    var img = new Image();
    img.src = $(this).attr("src");
    $("#mask-layer").show();
    $("#mask-layer .mask-layer-img").html(img);
  });

  $(".blog-title .title-category").click(function () {
    var key = $(this).data("cateHref");
    $(".category-all .category-item").each(function () {
      if ($(this).data("category") == key) {
        $(this).addClass("active").siblings().removeClass("active");
      }
    });
    $(".category-box ul").each(function () {
      if ($(this).data("cateBox") == key) {
        $(this).show().siblings().hide();
      }
    });
    $("#aside .categories")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $("#aside .page-item").hide();
    $(".category-all").css("display", "flex").show();
  });

  // blog-title tag mapping menu
  $(".blog-title .title-tag").click(function () {
    var key = $(this).data("tagHref");
    $(".tags-all .tags-item").each(function () {
      if ($(this).data("tag") == key) {
        $(this).addClass("active").siblings().removeClass("active");
      }
    });
    $(".tags-box ul").each(function () {
      if ($(this).data("tagBox") == key) {
        $(this).show().siblings().hide();
      }
    });
    $("#aside .tags").addClass("active").siblings().removeClass("active");
    $("#aside .page-item").hide();
    $(".tags-all").css("display", "flex").show();
  });

  // sidebar-mapping by contents scroll
  $("#contents").scroll(function () {
    var t = $(this).scrollTop();

    for (var i = topArr.length - 1; i >= 0; i--) {
      if (t >= topArr[i]) {
        $(".pin").css("top", i * 24 + 5 + "px");
        break;
      }
    }
  });

  // focus list active
  $(".sidebar-panel-ul li a").click(function () {
    var self = $(this);
    setTimeout(function () {
      var index = self.data("index");
      $(".pin").css("top", index * 24 + 5 + "px");
    }, 500);
  });
}

function bindActive() {
  $(".x-pjax, .page-next, .page-previous").on("click", function () {
    var id = $(this).data("id");
    $_xpjax = $(".x-pjax");
    $_xpjax.removeClass("active");
    $_xpjax.each(function () {
      if ($(this).data("id") == id) {
        $(this).addClass("active");
      }
    });
  });
}
