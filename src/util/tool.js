export default {
  toast (msg = '', time = 1500) {
    var toastDiv = document.createElement('div')
    toastDiv.className = 'x-common-toast'
    toastDiv.innerHTML = msg
    document.body.appendChild(toastDiv)
    toastDiv.style.display = 'block'
    toastDiv.style.margin = `-${toastDiv.offsetHeight / 2}px 0 0 -${toastDiv.offsetWidth / 2}px`
    var timer = setTimeout(() => {
      toastDiv.className = 'x-common-toast-hide'
      clearTimeout(timer)
      var timer2 = setTimeout(() => {
        document.body.removeChild(toastDiv)
        clearTimeout(timer2)
      }, 200)
    }, time)
  },
  excPrompt (_err) {
    if (_err.response) {
      this.toast('api error, HTTP CODE:' + _err.response.status, 3000)
    } else {
      this.toast('操作异常', 1000)
    }
  }
}
