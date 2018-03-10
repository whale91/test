videojs.options.flash.swf = "video-js.swf";

$(document).ready(function () {
  $(".datepicker").datepicker({
                                currentText: "Сегодня",
                                monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                                monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                                dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                                dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                                dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                                weekHeader: "Нд",
                              });
  
  $('.styler, select').styler({
                                selectSearch: true
                              });
  
  $('.aside_pull').click(function () {
    $(this).parents('aside').find('.aside_form').slideToggle(400);
    $(this).parents('aside').find('.aside_pull').toggleClass('aside_pull_is_open');
  });
  
  
  $('div.tabs').on('click', 'span:not(.current)', function () {
    $(this).addClass('current').siblings().removeClass('current')
           .parents('div.profile_tabs').find('div.box').eq($(this).index()).fadeIn(400).siblings('div.box').hide();
  });
  
});


$('.back_ticket').click(function () {
  if (!$('.back_ticket .styler').hasClass('checked')) {
    $('.date_input_disabled').css('display', 'block');
    
  } else {
    $('.date_input_disabled').css('display', 'none');
  }
});

//$(function() {
//    var pull   = $('.activities_list').find('.activities_pull');
//    menu   = $('.activities_list').find('.activities_hidden');
//    menuHeight = menu.height();
//    overlay_login = $('.overlay_act');
//    $(pull).on('click', function(e) {
//        e.preventDefault();
//        menu.fadeToggle();
//        $(this).toggleClass('activities_pull_open');
//        $(this).parents(".wrapper").toggleClass('wrapper_act_open');
//    });
//    $(overlay_login).on('click', function(e) {
//        $(this).parents(".wrapper").toggleClass('wrapper_act_open');
//        e.preventDefault();
//        menu.fadeToggle();
//    });
//});

$('.activities_pull').parents('.activities_list').click(function (e) {
  var $message = $('.activities_hidden');
  
  if ($message.css('display') != 'block') {
    $message.show();
    
    var firstClick = true;
    $(document).bind('click.myEvent', function (e) {
      if (!firstClick && $(e.target).closest('.activities_hidden').length == 0) {
        $message.hide();
        $(document).unbind('click.myEvent');
      }
      firstClick = false;
    });
  }
  
  e.preventDefault();
});
//$(function() {
//    $('.aside_pull').click(function(e) {
//        e.preventDefault();
//        $(this).parents('activities_list').find('.activities_hidden').fadeToggle();  
//        $(this).parents('activities_list').toggleClass('activities_pull_open');
//        $(this).parents(".wrapper").toggleClass('wrapper_act_open');
//    });
//    $('.overlay_act').on('click', function(e) {
//        $(this).parents(".wrapper").toggleClass('wrapper_act_open');
//        e.preventDefault();
//        $('.activities_hidden').fadeToggle();
//    });
//});

var menu_active = 0;
$('.open_m_m').click(function () {
  if (!$('.mobile_menu').hasClass('active')) {
    $('.mobile_menu').addClass('active');
    $('.wrapper').addClass('closed');
    $('.open_m_m').addClass('active');
    menu_active = 1;
  } else {
    $('.mobile_menu').removeClass('active');
    $('.wrapper').removeClass('closed');
    $('.open_m_m').removeClass('active');
    menu_active = 0;
  }
});
$('.closed_menu').click(function () {
  if (menu_active == 1) {
    $('.mobile_menu').removeClass('active');
    $('.wrapper').removeClass('closed');
    $('.open_m_m').removeClass('active');
    menu_active = 0;
  }
});
$('.close_m_m').click(function () {
  if (menu_active == 1) {
    $('.mobile_menu').removeClass('active');
    $('.wrapper').removeClass('closed');
    $('.open_m_m').removeClass('active');
    menu_active = 0;
  }
});


$(window).resize(function () {
  if ($(window).width() < 1154) {
    $('.nav_head').appendTo('.mobile_nav');
  } else {
    $('.nav_head').appendTo('.main_nav');
  }
});
$(window).ready(function () {
  if ($(window).width() < 1154) {
    $('.nav_head').appendTo('.mobile_nav');
  } else {
    $('.nav_head').appendTo('.main_nav');
  }
});

$(window).resize(function () {
  if ($(window).width() < 750) {
    $('.contacts_head').appendTo('.mobile_contacts');
    $('.form_head_inner').appendTo('.form_head_modal');
  } else {
    $('.contacts_head').appendTo('.right_head');
    $('.form_head_inner').appendTo('.form_head_bg');
  }
});
$(window).ready(function () {
  if ($(window).width() < 750) {
    $('.contacts_head').appendTo('.mobile_contacts');
    $('.form_head_inner').appendTo('.form_head_modal');
  } else {
    $('.contacts_head').appendTo('.right_head');
    $('.form_head_inner').appendTo('.form_head_bg');
  }
});

$('.show-info').click(function () {
                        $(this).closest('.transaction_block').find('.transaction-info').toggle('slow');
                        $(this).closest('.transaction_block').find('.transaction_bottom').toggle('hide');
                        $(this).closest('.batch_block').find('.ticket').toggle('slow');
                      }
);