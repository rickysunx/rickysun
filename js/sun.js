/**
 * Author: Ricky Sun
 * Date:24/08/2016
 *
 */

$(function () {
  $(".nav a").on("click", function () {
    if ($(".navbar-toggle").css("display") != "none") {
      $(".navbar-toggle").trigger("click");
    }
  });

  portfolioGalleryBinding();

  saveTracking("Root");
});

function portfolioGalleryBinding() {
  $("#PortfolioGalleryThumbnail").hover(
    function () {
      $("#PortfolioGalleryThumbnail img").addClass(
        "PortfolioGalleryThumbnailImageFocus"
      );
    },
    function () {
      $("#PortfolioGalleryThumbnail img").removeClass(
        "PortfolioGalleryThumbnailImageFocus"
      );
    }
  );

  $("#PortfolioGalleryThumbnail img").click(function () {
    var imageIndex = $(this).attr("_index");
    $("#PortfolioGalleryFullSizeImage img").hide();
    var theImage = $(
      "#PortfolioGalleryFullSizeImage img:eq(" + imageIndex + ")"
    );

    $("#PortfolioGalleryFullSizeImage img:eq(" + imageIndex + ")").fadeIn();
  });
}

function goPage(page) {
  $("#navbar ul li").removeClass("active");
  $("#" + page + "Link").addClass("active");
  if ($("section:visible").length == 0) {
    $("#" + page).fadeIn();
  } else {
    $("section:visible").fadeOut(function () {
      $("#" + page).fadeIn();
    });
  }
  saveTracking(page);
}

function saveTracking(action) {
  $.get("service/save_tracking.php?action=" + action);
}

var submitContactFormFirstTime = true;

function submitContactForm() {
  $("#MessageInfo").html(
    "<img src='images/download.gif' style='width:40px;'/>&nbsp;&nbsp;Sending data to server"
  );
  $("#MessageDialog").modal();

  var _callServer = function () {
    $.post(
      "service/save_message.php",
      $("#contactForm").serialize(),
      function (data) {
        if (data.success == 1) {
          $("#MessageInfo").html(
            "<span style='font-size:32px;color:#0a0;display:block;float:left;margin-top:-8px;' class='glyphicon glyphicon-ok-sign'></span> <span style='margin-left:10px;'>You message saved successfully</span>"
          );
          $("#MessageDialog").modal();
          $("#contactForm")[0].reset();
        } else {
          $("#MessageInfo").html(
            "<span style='font-size:32px;color:#d00;display:block;float:left;margin-top:-8px;' class='glyphicon glyphicon-remove-sign'></span> <span style='margin-left:10px;'>" +
              data.errinfo +
              "</span>"
          );
          $("#MessageDialog").modal();
        }
      },
      "json"
    );
  };

  if (submitContactFormFirstTime) {
    submitContactFormFirstTime = false;
    setTimeout(function () {
      _callServer();
    }, 1000);
  } else {
    _callServer();
  }

  return false;
}

function showProjectMoreInfo(title, infoid) {
  $("#ProjectTitle").html(title);
  $("#ProjectInfo").html($("#" + infoid).html());
  $("#ProjectInfoDialog").modal();
  saveTracking("MoreInfo/" + title);
}

function showSourceCodeUnavailable() {
  $("#ProjectTitle").html("Source code unavailable");
  $("#ProjectInfo").text(
    "Sorry, source code is not available for this project, as it is a live commercial project. "
  );
  $("#ProjectInfoDialog").modal();
}

var projectSnapshots = {
  robinhome: [
    "robinhome.png",
    "robinhome01.png",
    "robinhome02.png",
    "robinhome03.png",
    "robinhome04.png",
    "robinhome05.png",
    "robinhome06.png",
    "robinhome07.png",
    "robinhome08.png",
  ],
  touchone: [
    "touchone.png",
    "touchone01.png",
    "touchone02.png",
    "touchone03.png",
    "touchone04.png",
  ],
  pca: ["pca.png", "pca01.png", "pca02.png"],
  rig: ["rig.png", "rig01.png", "rig02.png", "rig03.png"],
  xiao_e: [
    "xiao_e.png",
    "xiao_e_02.jpg",
    "xiao_e_03.jpg",
    "xiao_e_04.png",
    "xiao_e_05.jpg",
    "xiao_e_06.jpg",
  ],
  sms: ["sms_01.png", "sms_02.jpg", "sms_03.jpg", "sms_04.png", "sms_05.png"],
  psf: ["psf.jpg", "psf_01.png", "psf_02.png", "psf_03.png", "psf_04.jpg"],
  stayzey: [
    "Stayzey.png",
    "stayzey_02.png",
    "stayzey_03.png",
    "stayzey_05.png",
    "stayzey_06.png",
    "stayzey_07.png",
    "stayzey_08.png",
  ],
};

function showSnapshots(projectName) {
  var html = '<div id="PortfolioGalleryFullSizeImage">';
  var images = projectSnapshots[projectName];
  for (var i = 0; i < images.length; i++) {
    html +=
      "<a href='images/" +
      images[i] +
      "' target='_blank'><img src=\"images/" +
      images[i] +
      '"/></a>';
  }
  html += "</div>";

  html += '<div id="PortfolioGalleryThumbnail">';
  for (var i = 0; i < images.length; i++) {
    html += '<img _index="' + i + '" src="images/' + images[i] + '"/>';
  }

  html += "</div>";

  $("#PortfolioGalleryContainer").html(html);
  $("#PortfolioGalleryFullSizeImage img").hide();
  $("#PortfolioGalleryFullSizeImage img:eq(0)").show();
  portfolioGalleryBinding();

  $("#PortfolioGalleryDialog").modal();

  saveTracking("Snapshots/" + projectName);
}
