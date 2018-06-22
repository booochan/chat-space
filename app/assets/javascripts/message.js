$(function() {
  function buildHTML(message){
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    else {
      insertImage = '';
    }
    var html =`<div class='message' data-message-id='${message.id}'>
                  <div class='upper-message'>
                    <div class='upper-message__name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__createdat'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-meesage'>
                      <div class='lower-message__text'>
                        ${message.text}
                      </div>
                      <div class='lower-message__image'>
                        ${insertImage}
                      </div>
                  </div>
                </div>`
  $('.group__chat').append(html);
  }

  function alertFlash() {
    var html =
      `<div class="nortification">
        <p class="alert">メッセージか画像を入力してください</p>
      </div>`
    $('.notification').append(html);
    $('.notification').fadeIn(500).fadeOut(2000);
    setTimeout(function(){
     $('.notification').remove();
    },2500);
  }
  function scrollBottom(position){
    $(position).animate({ scrollTop: $(position)[0].scrollHeight}, 'fast');
    return false;
  }
  function colorChange(part) {
    $(part).css('color', '#e55f29');
  }
  function colorRemove(part) {
    $(part).css('color', '#434A54');
  }
  function formReset(part) {
    $(part)[0].reset();
  }
  function focusClear(part) {
    $(part).blur();
  }

  $('#message_image').on('change',function() {
    if ($(this).val() !== '' ) {
      colorChange($(this).parent());
    }
  });

  $('#send_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var inputText = $("#message_text").val();
    var inputImage = $("#message_image").val();
    if (inputText !== '' || inputImage !== '') {
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function(data){
          var dataId = data.id;
          buildHTML(data);
        })
        .fail(function(){
          alert('通信に失敗しました');
        })
      e.stopPropagation();
    } else {
        alertFlash();
    }
    colorRemove($('#message_image').parent());
    scrollBottom('.group__chat');
    formReset(this);
    focusClear('#send-btn');
  });

  var interval = setInterval(function() {
    var lastId = $('.message').last().data('messageId');
    var url = location.pathname;
    if (url.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        type: 'GET',
        url: url,
        data: { message_id: lastId },
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message){
          buildHTML(message);
        });
      })
      .fail(function() {
        alert('通信に失敗しました');
      })
      scrollBottom('.group__chat');
    } else {
      clearInterval(interval);
      }} , 5000 );
});
