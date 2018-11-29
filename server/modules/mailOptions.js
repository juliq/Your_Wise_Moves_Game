const mailOptionsConfig = (userEmail, content) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    console.log(content);

    let mailOptions = {
        from: '"Your Wise Moves (dev email)" <yourwisemovesdev@gmail.com>', // sender address
        to: userEmail, // list of receivers
        subject: `Your Wise Moves Reflections from ${today}`, // Subject line
        text: 'reflections:', // plain text body
        //html below needs further styling
        //the content object given to this function will supply the content.*whatever* in the html below
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style type="text/css">
                body {
                    font-family: Georgia, sans-serif
                }
        
                .container {
                    width: 800px;
                    margin: 40px auto 80px;
                    background-color: #49a2c14f;
                    padding: 10px 50px 10px 50px;
                    border-radius: 15px
                }
        
                .section-header {
                    text-align: center
                }
        
                .content-header {
                    font-style: italic
                }
                footer{
                    text-align: end
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <header>
                    <h1>Your Reflections on Your Mindful Moves</h1>
                </header>
                <br/>
                <section class="intention">
                    <h5 class="section-header">Your intention or Question:</h5>
                    <p>${content.intention}</p>
                </section>
                <section class="question">
                    <h5 class="section-header">Your Map Movement:</h5>
                    <h6 class="content-header">Your Card:</h6>
                    <p class="question">${content.question_one}</p>
                    <h6 class="content-header">Your Response:</h6>
                    <p>${content.response_one}</p>
                </section>
                <section class="question">
                    <h5 class="section-header">Your Open Movement:</h5>
                    <h6 class="content-header">Your Card:</h6>
                    <p class="question">${content.question_two}</p>
                    <h6 class="content-header">Your Response:</h6>
                    <p>${content.response_two}</p>
                </section>
                <section class="question">
                    <h5 class="section-header">Your Visualize Movement:</h5>
                    <h6 class="content-header">Your Card:</h6>
                    <p class="question">${content.question_three}</p>
                    <h6 class="content-header">Your Response:</h6>
                    <p>${content.response_three}</p>
                </section>
                <section class="question">
                    <h5 class="section-header">Your Engage Movement:</h5>
                    <h6 class="content-header">Your Card:</h6>
                    <p class="question">${content.question_four}</p>
                    <h6 class="content-header">Your Response:</h6>
                    <p>${content.response_four}</p>
                </section>
                <section class="question">
                    <h5 class="section-header">Your Sustain Movement:</h5>
                    <h6 class="content-header">Your Card:</h6>
                    <p class="question">${content.question_five}</p>
                    <h6 class="content-header">Your Response:</h6>
                    <p>${content.response_five}</p>
                </section>
                <footer>
                    <h4>Thank you for playing</h4>
                </footer>
            </div>
        </body>
        
        </html>` // html body
    };
    return mailOptions
}

module.exports = mailOptionsConfig