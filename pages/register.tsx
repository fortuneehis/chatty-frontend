import { Field, Form, Formik } from "formik"
import { NextPage, NextPageContext } from "next"
import * as yup from "yup"
import { UserService } from "../services"
import APIService from "../utils/api"

type InitialValues = {
    username: string
    password: string
}

const Register: NextPage  = () => {
    return (
        <div>
            <Formik initialValues={{
                username: "",
                password: ""
            }} 
            onSubmit={async({username, password}: InitialValues)=>{
                const response = await UserService.createUser(username, password)
                console.log(response)
            }}>
                <Form>
                    <Field name="username" type="text"/>
                    <Field name="password" type="password"/>
                    <button className="p-2" type="submit">Create account</button>
                </Form>
            </Formik>
        </div>

    )
}

export const getServerSideProps = async ({req, res}: NextPageContext) => {
        
    const cookies = req?.headers.cookie as string

    const [response, error] = await UserService.getCurrentUser({
        Cookie: cookies
    })

    const user = response?.data

    if(user) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }


    return {
        props: {}
    }

    
}

export default Register