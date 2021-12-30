var data = new FormData();
function validatePersonal() {
    var first = $("#first_name").val();
    var last = $("#last_name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var month = $("#birth_month").val();
    var date = $("#birth_date").val();
    var year = $("#birth_year").val();
    var dob = year + "/" + month + "/" + date;
    var address = $("#address").val();
    var country = $("#country").val();
    var regex1 = /^[a-zA-Z ]{2,30}$/;
    var regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regex3 = /^[\+]?\d+$/;
    console.log(dob)
    console.log(new Date(dob))

    if (first == "" || first == null || first == undefined || regex1.test(first) == false) {
        return [false, "First name Value is not Valid"];
    }
    else if (last == "" || last == null || last == undefined || regex1.test(last) == false) {
        return [false, "Last name Value is not Valid"];
    }
    else if (email == "" || email == null || email == undefined || regex2.test(email) == false) {
        return [false, "Email Value is not Valid"];
    }
    else if (phone != "" && phone != null && phone != undefined && regex3.test(phone) == false) {
        return [false, "Phone Number Value is not Valid"];
    }
    else if (new Date(dob) == "" || new Date(dob) == null || new Date(dob) == undefined || new Date(dob) == "Invalid Date") {
        return [false, "Date of Birth Value is not Valid"];
    }
    else if (address == "" || address == null || address == undefined) {
        return [false, "Address Value is not Valid"];
    }
    else if (country == "" || country == null || country == undefined) {
        return [false, "Country/State Value is not Valid"];
    } else {
        data.append("first", first);
        data.append("last", last);
        data.append("email", email);
        data.append("phone", phone);
        data.append("dob", dob)
        data.append("address", address);
        data.append("country", country);
        return [true, "All details are valid"];
    }
}

function validateAccount() {
    var ad = $("#about_us").val();
    var salary = $("#salary").val();
    var regex1 = /^\d+$/;


    if (ad == null || ad == undefined) {
        return [false, "Ad Value is nt Valid"];
    }
    else if (salary == "" || salary == null || salary == undefined || regex1.test(salary) == false) {
        return [false, "Salary Value is not Valid"];
    } else {
        data.append("ad", ad);
        data.append("salary", salary);
        return [true, "all details are valid"];
    }


}

function validateFiles() {
    var cl = $("#cl")[0].files;
    var cv = $("#cv")[0].files;

    if (cl == "" || cl == undefined || cl.length == 0) {
        return [false, "Cover letter Input is empty"];
    }
    else if (cl.length >= 1 && cl[0] && cl[0].name.split(".")[1] != "pdf") {
        return [false, "Cover Letter input must be a pdf file"];
    }
    else if (cv == "" || cv == undefined || cv.length == 0) {
        return [false, "Resume Input is empty"];
    }
    else if (cv.length >= 1 && cv[0] && cv[0].name.split(".")[1] != "pdf") {
        return [false, "Resume input must be a pdf file"];
    } else {
        data.append("cl", cl[0]);
        data.append("cv", cv[0]);
        return [true, "All details are correct"];
    }
}

(function ($) {

    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            current: ''
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            var error = $(".errory")
            error.html("");

            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
                return true;
            }
            if (currentIndex === 1) {
                var [valid, mmsg] = validatePersonal();
                console.log(currentIndex);
                // valid = true;
                if (valid) {
                    console.log(currentIndex)
                    console.log(valid);
                    form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
                    return true;
                } else {
                    var msg = `<div class="alert alert-dark" role="alert">` + mmsg + `</div>`;
                    error.html(msg);
                    return false;
                }
            }
            if (currentIndex === 2) {
                var [valid, mmsg] = validateAccount();
                console.log(currentIndex);
                // valid = true;
                if (valid) {
                    console.log(currentIndex)
                    console.log(valid);
                    form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
                    return true;
                } else {
                    var msg = `<div class="alert alert-dark" role="alert">` + mmsg + `</div>`;
                    error.html(msg);
                    return false;
                }

            }
            if (currentIndex === 3) {
                var [valid, mmsg] = validateFiles();
                console.log(currentIndex);
                // valid = true;
                if (valid) {
                    console.log(currentIndex)
                    console.log(valid);
                    form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
                    return true;
                } else {
                    var msg = `<div class="alert alert-dark" role="alert">` + mmsg + `</div>`;
                    error.html(msg);
                    return false;
                }

            }
        },
        onFinishing: function (event, currentIndex) {
            var error = $(".errory")
            error.html("");
            var [valid, mmsg] = validateFiles();
            // valid = true;
            if (valid) {
                console.log(currentIndex)
                console.log(valid);
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
                return true;
            } else {
                var msg = `<div class="alert alert-dark" role="alert">` + mmsg + `</div>`;
                error.html(msg);
                return false;
            }
        },
        onFinished: function (event, currentIndex) {
            var url = "controller/submit.php";
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'Please Hold on as details are uploaded, do not refresh.',
                        timer: 4000000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                },
                success: function (data) {
                    console.log(data);
                    var data = JSON.parse(data);
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: data.success,
                            text: "Click OK to refresh page and check your email for confirmation of successfull submition.",
                            allowOutsideClick: false,
                        }).then((result) => {
                            location.reload();
                        });
                    }
                    else {
                        event.preventDefault();
                        event.stopPropagation();
                        var error = $(".errory")
                        var msg = `<div class="alert alert-dark" role="alert">` + data.error + `</div>`;
                        error.html(msg);
                        return false;
                    }

                }
            });
        },
        onStepChanged: function (event, currentIndex, priorIndex) {


            return true;
        }
    });


    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: '',
        monthDefault: '',
        yearDefault: '',
        minimumAge: 0,
        maximumAge: 120
    });

})(jQuery);