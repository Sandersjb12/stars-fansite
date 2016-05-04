function validateForm()
{
    var name = document.forms["guestbook"]["name"].value;
    var email = document.forms["guestbook"]["email"].value;

    if (name=="" || name==null)
    {
        alert("Invalid name");
        return false;
    }

    if (email=="" || email==null)
    {
        alert("Invalid email address");
        return false;
    }

    return true;
}