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
    .done(function(message){
      var html = buildHTML(message);
      $('.message').append(html);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(message) {
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message__box:last').data("message-id")
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id},
      })
      .done(function(message) {
        console.log(message)
        var insertHTML = '';
        message.forEach(function(messages){
          insertHTML = buildHTML(messages);
          $('.message').append(insertHTML);
          $('.message').animate({scrollTop: $('.message')[0].scrollHeight},);
          console.log('errrrrrrr');
        });
      })
      .fail(function() {
        console.log('error');
      });
  }}
  setInterval(reloadMessages, 7000);
})
