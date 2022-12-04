$(window).scroll(function() {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 500);
});


$("#modal-btn").click(function() {
    $.get("http://localhost:4000/patient-directory", function(data, status) {
        let exist = false;
        data.forEach(result => {
            if ($('#exampleInputEmail').val() == result.patient_email) {
                exist = true
            }
        })
        if (exist) {
            $.post("http://localhost:4000/send-OTP", {
                patient_Email: $('#exampleInputEmail').val()
            }, function(res, status) {
                console.log(res)
            })
            $('#modal').modal('show');
        } else {
            $('#error').modal('show');
        }

    });

});

const compareOTP = (inputOTP, inputEmail) => {
    $.post("http://localhost:4000/verify", {
        inputOTP: inputOTP,
        inputEmail: inputEmail
    }, function(res, status) {
        console.log(res.isVerified)
        if (res.isVerified) {
            $(location).attr('href', `http://localhost:4000/Manage-Appointments/${res.patient_id}`);
        }
    })
}