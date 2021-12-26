$("#cform").validate({
    errorPlacement: function errorPlacement(error, element) { element.after(error); },
    // errorClass: "error fail-alert",
    // validClass: "valid success-alert",
    rules: {
        FirstName: {
            required: true,
            minlength: 3,
        },
        MiddleName: {
            required: true,
            minlength: 3,
        },
        LastName: {
            required: true,
            minlength: 3,
        },
        DOB: {
            required: true,
            date: true,
            // minlength: 18
        },
        'EmailIDF[EmailAddress]': {
            required: true,
            email: true
        },
        'PhoneIDF[PhoneNo]': {
            required: true,
            minlength: 10,
            maxlength: 10
        },
        Atype: {
            required: true,
        },
        Add: {
            required: true,
        },
        City: {
            required: true,
        },
        District: {
            required: true,
        },
        Stat: {
            required: true,
        },
        Country: {
            required: true,
        },
        'AddressIDF[PinCode]': {
            required: true,
            minlength: 6,
            maxlength: 6,

        },
        CompanyName: {
            required: true,
        },
        'CompanyIDF[GSTINNo]': {
            required: true,
            minlength: 15,
            maxlength: 15,

        },
        Headquarter: {
            required: true,
        },
        WebsiteURL: {
            required: true,
        },
        Aboutc: {
            required: true,
        },
        Speciality: {
            required: true,
        },
        Foundate: {
            required: true,
        },
        rev: {
            required: true,
        },
        HeadCountType: {
            required: true,
        },
        HeadCount: {
            required: true,
        },
        CompanyType: {
            required: true,
        },
        IndustryType: {
            required: true,
        },

    },
    messages: {
        FirstName: {
            required: "* First name is required",
            minlength: "* Name should be at least 3 characters",
        },
        MiddleName: {
            required: "* Middle name is required",
            minlength: "* MiddleName should be at least 3 characters",
        },
        LastName: {
            required: "* Last name is required",
            minlength: "* LastName should be at least 3 characters",
        },

        Email: {
            required: "* Email is required",
            email: "* The email should be in the format: abc@domain.tld"
        },

    }
});



var form = $("#wizard");
var cform = $("#cform");

form.steps({
    headerTag: "h4",
    bodyTag: "section",
    transitionEffect: "fade",
    enableAllSteps: true,
    transitionEffectSpeed: 500,
    onStepChanging: function (event, currentIndex, newIndex) {


        cform.validate().settings.ignore = ":disabled,:hidden";
        // console.log(cform.valid())
        if (cform.valid() == false) {

            // console.log(newIndex)
            // console.log(currentIndex)
            if (newIndex === 1) {
                $('.steps ul').addClass('step-2');
            } else {
                $('.steps ul').removeClass('step-2');
            }
            if (newIndex === 2) {
                $('.steps ul').addClass('step-3');
            } else {
                $('.steps ul').removeClass('step-3');
            }

            // $('.wizard > .steps li a').click(function () {
            //     $(this).parent().addClass('checked');
            //     $(this).parent().prevAll().addClass('checked');
            //     $(this).parent().nextAll().removeClass('checked');
            // });


            // $('.forward').click(function () {
            //     $("#wizard").steps('next');
            // })
            // $('.backward').click(function () {
            //     $("#wizard").steps('previous');
            // })
            return true;
        } else {

            return cform.valid();
        }


        // return true;
    },
    labels: {
        finish: "Submit",
        next: "Next",
        previous: "Previous"
    },
    onFinished: function (event, currentIndex) {
        // cform.validate().settings.ignore = ":disabled,:hidden";
        // if (cform.valid() == true) {
        var cform = $(this);
        // Submit form input
        cform.submit();
        // let Pid = `{{ Pid }}`;
        // console.log(Pid);
        // let value = cform.find(':input').filter(function () {
        //     return $.trim(this.value).length > 0
        // }).serializeJSON();
        let value = $('#cform').serializeJSON();
        // console.log(value);
        // console.log(typeof (value));

        if (Pid) {
            fetch(url + '/PersonDetailApi/' + Pid, { mode: 'cors', method: 'patch', body: JSON.stringify(value), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + AToken } })
                .then((response) => {
                    if (response.status == 200) {

                        return response.json();
                    } else {
                        throw Error(response.statusText);

                    }

                })
                .then((myJson) => {

                    // console.log(myJson);
                    sessionStorage.setItem("Msg", "Update Contact SucessFully");
                    window.location = "/contact_info/" + Pid;
                }).catch((error) => {
                    // Handle the error

                    showToast(error + ", Try Again !");

                });

        } else {


            fetch(url + '/PersonDetailApi', { mode: 'cors', method: 'post', body: JSON.stringify(value), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + AToken } })
                .then((response) => {
                    if (response.status == 201) {

                        return response.json();
                    } else {
                        throw Error(response.statusText);

                    }

                })
                .then((myJson) => {

                    // console.log(myJson);
                    sessionStorage.setItem("Msg", "Create Contact SucessFully");
                    window.location = "/contacts";
                }).catch((error) => {
                    // Handle the error

                    showToast(error + ", Try Again !");

                });
        }
        // console.log("form submited")

        // }

    }

})

// Custom Steps Jquery Steps
$('.wizard > .steps li a').click(function () {
    $(this).parent().addClass('checked');
    $(this).parent().prevAll().addClass('checked');
    $(this).parent().nextAll().removeClass('checked');
});
// Custom Button Jquery Steps
$('.forward').click(function () {
    $("#wizard").steps('next');
    // $('.wizard > .steps li a').parent().addClass('checked');
    // $('.wizard > .steps li a').parent().prevAll().addClass('checked');
    // $('.wizard > .steps li a').parent().nextAll().removeClass('checked');

});
$('.backward').click(function () {
    $("#wizard").steps('previous');
});


