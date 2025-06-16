import Form from "../components/form";

function SignIn(){
    return(
        <Form route="/api/token/" method="signin"></Form>
    )
}

export default SignIn