"use strict";
window.onload = () => {
    let form = document.forms[0];
    console.log(form);
    form.onsubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var object = {};
        new FormData(form).forEach(function (value, key) {
            console.log("key: " + key);
            object[key] = value;
        });
        console.log(object);
    };
};
