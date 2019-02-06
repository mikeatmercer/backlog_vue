import $ from 'jquery';

export default function(string) {
  //var stripped = string.replace(/<[\/]{0,1}(span|SPAN|font|FONT|script|SCRIPT)[^><]*>/g,"")
  var allowed_tags = [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul','ol','nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div','table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','img' ];
  var p = $(string);
  var p = $(string).wrap("<div/>");
  $(p).parent().find('*').each(function(i,e){
    var item = e;
    if($.inArray($(e).prop("tagName").toLowerCase(),allowed_tags) === -1) {
      $(e).contents().unwrap();

    }
    $(this).removeAttr('style').removeAttr('dir');
    if($(this).prop('tagName').toLowerCase() !== "img") {
      $(this).removeAttr('src');
    }
  });
  return $("<div />").append($(p).clone()).html();
  /*
  var allowed_attr = ['href','src'];
  var allowed_tags = [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul','ol','nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div','table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','img' ];
  $(p).find('*').each(function(i,e){
    var item = e;
    if($.inArray($(e).prop("tagName").toLowerCase(),allowed_tags) === -1) {
      console.log($(e).prop("tagName"));
      $(e).contents().unwrap();
      return;
    }
    $.each(this.attributes, function() {
      if(!this.specified) {
        return;
      }
      if($.inArray(this.name, allowed_attr) !== -1) {
        return;
      }
      $(e).attr(this.name, "");
    });
  });
  $(p).wrap('<div />');
  console.log($(p).html());
  var doc = document.createElement('div');
  doc.innerHTML = $(p).parent().html();
  console.log(doc.innerHTML);
  */
}
