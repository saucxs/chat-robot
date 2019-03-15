/**
 * 防抖
 * @param   func-回调函数; wait-延迟执行的毫秒; immediate：true表立即执行，false表示非立即执行
 * @return   yyyy-MM-dd hh:mm 格式的时间
 */
export function debounce(func, wait, immediate){
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
    }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * 邮箱校验
 * @param   value-要验证的值
 * @return   true：通过，false：不通过
 */
export function checkEmail(value){
  if (!value) return ;
  var regEmail = /^\w+@\w+\.[a-z]{2,6}$/;
  return regEmail.test(value)
}
