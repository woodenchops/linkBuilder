// create copy notification
function CopyLinkNotification(x) {

    var copyNotification = document.querySelector(x);

    this.display = function() {

        copyNotification.classList.add('show');
        setTimeout(function() {
            copyNotification.setAttribute('tabindex', '0');
            copyNotification.focus();
        });
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 1000);

        setTimeout(function() {
            copyNotification.removeAttribute('tabindex');
        }, 2000)
    }
}

export default CopyLinkNotification;