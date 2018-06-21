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
    return html;
  }

  function scrollBottom(position){
    $(position).animate({ scrollTop: $(position)[0].scrollHeight}, 'fast');
    return false;
  }

  var interval = setInterval(function() {
    var lastId = $('.message').last().data('messageId');
    var url = location.pathname;
    if (url.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: { id: lastId }
      })
      .done(function(data) {
        var insertHTML = '';
        data.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        $('.group__chat').append(insertHTML);
      })
      .fail(function() {
        alert('通信に失敗しました');
      })
      scrollBottom('.group__chat');
    } else {
      clearInterval(interval);
      }} , 5000 );

  $('#send_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.group__chat').append(html);
      $('#send_message')[0].reset();
    })
    .fail(function(){
      alert('通信に失敗しました');
    })
    scrollBottom('.group__chat');
  });

});
