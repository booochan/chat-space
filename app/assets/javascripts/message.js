$(function() {
  function buildHTML(message){
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    else {
      insertImage = '';
    }
    var html =`<div class='message'>
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
    $('.group__chat').animate({ scrollTop: $('.group__chat')[0].scrollHeight}, 'fast');
    return false;
  });
});
