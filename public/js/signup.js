var submitBtn = document.querySelector("#submitBtn");
var usernameEl = document.querySelector("#suUser");
var emailEl = document.querySelector("#suEmail");
var passEl = document.querySelector("#suPass");
var passConfirmEl = document.querySelector("#suPassConfirm");

createUser()

function createUser() {
    if (submitBtn) {
        submitBtn.addEventListener("click", async () => {
            const username = usernameEl.value.trim();
            const email = emailEl.value.trim();
            const password = passEl.value.trim();
            const passConfirm = passConfirmEl.value.trim();
            if (password !== passConfirm) {
                alert("Error! Passwords do not match. Please try again.")
                return
            }

            const response = await fetch("/api/user", {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
                headers: { "Content-Type": "application/json" }
            })
            if (response.ok) {
                console.log("Send to homepage or user page")
            } else {
                alert("An error occured! You messed up!")
            }




            // 

            //     db.query(`INSERT INTO user(username, password, email) VALUES("${username}", "${pass}", "${email}"`)
            // } else {
            //     alert("Error! Passwords do not match. Please try again.");
            // }
        }
        )
    }
}

