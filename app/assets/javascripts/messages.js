$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = //メッセージに画像が含まれる場合のHTMLを作る
       `<div class="message__box" data-message-id=${message.id}>
          <div class="message__user">
              ${message.user_name}
                <div class="message__user__time">
                  ${message.date}
                </div>
              <div class="message__user__text">
                <p class="message__user__text__content">
                  ${message.content}
                </p>
                  ${img} 
              </div>
          </div>
        </div>`
      return html;
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false,
      
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);

    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})
